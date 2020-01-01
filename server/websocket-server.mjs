import SocketIO from 'socket.io';
import cookieParser from 'cookie-parser';
import mongodb from 'mongodb';
import passport from 'passport';
import passportSocketIo from 'passport.socketio';
import Board  from './models/board.mjs';
import User from './models/user.mjs';
import Quote from './models/quote.mjs';
import { getDb } from './database.mjs';
const { ObjectId } = mongodb; // Single-line import not working

let _io;
let _db;

export function startWebSocketServer(httpServer, app, sessionStore) {
  _db = getDb();
  _io = new SocketIO(httpServer);
  _io.on('connection', onConnect);
  _io.use(passportSocketIo.authorize({
    key: 'connect.sid',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    passport,
    cookieParser,
    fail: (data, message, error, accept) => {
      if (error) {
        console.error(message);
      } else {
        accept(null, false);
      }
    },
  }));
  app.set('io', _io);

  console.log('WebSocket server started successfully.');
}

function onConnect(socket) {
  if (socket.request.user && socket.request.user.logged_in) { // Authenticated user
    console.log('Client connected');
    socket.emit('currentUserInfo', socket.request.user);
    socket.on('createUserAccount', userData => onCreateUserAccount(userData, socket));
    socket.on('addBoard', boardData => addBoard(boardData, socket));
    socket.on('addBoardMember', request => addBoardMember(request, socket));
    socket.on('addQuote', quoteData => onAddQuote(quoteData, socket));
    socket.on('addQuoteComment', commentData => onAddQuoteComment(commentData, socket));
    socket.on('deleteQuoteComment', request => onDeleteQuoteComment(request, socket));
    socket.on('toggleQuoteLike', request => onToggleQuoteLike(request, socket));
    socket.on('toggleCommentLike', request => onToggleCommentLike(request, socket));
    socket.on('updateQuoteComment', request => onUpdateQuoteComment(request, socket));
    socket.on('saveUserInfo', userData => saveUserInfo(userData, socket));
    sendInitDataToClient(socket);
  } else { // Unauthenticated client attempting to connect
    socket.disconnect();
    console.log('Unauthenticated client attempted to connect. Rejected connection.');
  }
}

function sendInitDataToClient(socket) {
  Promise.all([
    // Send the user info (name, profile pic, etc)
    User.find().lean().exec()
      .then(res => {
        const people = {};
        res.forEach(p => people[p._id] = p);
        console.log('Sending people update...');
        socket.emit('peopleUpdate', people);
      }),
    sendAllQuotesToClient(socket),
    // Send all the boards the user has access to TODO Filter!!
    Board.find().lean().exec()
      .then(boardList => {
        const boards = {};
        boardList.forEach(b => boards[b._id] = b);
        console.log('Sending boards updates...');
        socket.emit('boardList', boards);
      }),
  ])
    .catch(console.error);
}

function sendAllQuotesToClient(socket) {
  // Send all the quotes for the user TODO Filter!!
  return Quote.find().lean().exec()
    .then(res => {
      const quotes = {};
      res.forEach(q => quotes[q._id] = q);
      console.log('Sending quotes update...');
      socket.emit('quotesUpdate', quotes);
    });
}

function addBoard(data, socket) {
  new Board(Object.assign({}, data, {
    createdBy: socket.client.request.user._id,
    createdOn: Date.now(),
  }))
  .save((err, newBoard) => {
    if (err) {
      console.error(err);
    } else {
      pushBoardListUpdate(socket)
        .then(() => socket.emit('switchToBoard', newBoard._id));
    }
  });
}

const roleTypes = ['admin', 'contributor', 'viewer'];

async function addBoardMember(data, socket) {
  const user = socket.request.user;

  const {
    boardId,
    personId,
    role,
  } = data;

  // TODO: Ensure current user has requisite privileges on board
  const boardDoc = await Board.findOne({_id: boardId});

  if (!boardDoc) {
    console.warn(`User ${user._id} attempting to add member to board ${boardId}, which cannot be found.`);
    return null;
  }

  // Make sure the role is a valid role
  if (roleTypes.indexOf(role) === -1) {
    console.warn(`User ${user._id} attempting to add board member with unrecognized role '${role}'.`);
    return null;
  }

  // Make sure the user isn't already added (just in case)
  const memberIdx = indexOf(boardDoc.members, mem => mem.personId.equals(personId));
  if (memberIdx >= 0) {
    console.warn(`User ${user._id} attempting to add ${personId} to board ${boardId}, but user`
     + ' is already a member of that board. Ignoring request.');
    return null;
  }

  boardDoc.members.push({
    addedBy: user._id,
    addedOn: new Date(),
    personId,
    role,
  });

  await boardDoc.save();

  const updatedBoardDoc = await Board.findOneForClient(boardId);

  pushBoardUpdate(updatedBoardDoc.toObject());
}

function pushBoardListUpdate(socket) {
  return new Promise((resolve, reject) => {
    Board.getBoards().lean().exec((err, boards) => {
      if (err) {
        reject(err);
      } else {
        socket.emit('boardList', boards);
        resolve(boards);
      }
    });
  });
}

// TODO: Add object field checking to ensure not just anything sent from the frontend can be added the db
function onCreateUserAccount(userData, socket) {
  console.log('Adding person...');
  _db.collection('people').insertOne(userData, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      _db.collection('people').find({}).toArray((err, res) => {
        if (!err) {
          const people = {};
          res.forEach(person => {
            people[person._id] = person;
          });
          console.log('Sending people update...');
          _io.emit('peopleUpdate', people);
        }
      });
    }
  });
}

function saveUserInfo(userData, socket) {
  // Get the user ID from the session so the client can't spoof it
  const id  = socket.client.request.user._id;
  // TODO: Make sure all the data is here
  userData.accountSetupComplete = true;
  User.findByIdAndUpdate(id, userData, { new: true, useFindAndModify: false }, (err, updateUser) => {
    socket.emit('currentUserInfo', updateUser);
  });
}

function onAddQuote(quoteData, socket) {
  console.log('Adding quote...');
  quoteData.addedById = socket.request.user._id;
  new Quote(quoteData).save()
    // TODO: Send just the new quote to all interested clients
    .then(() => sendAllQuotesToClient(socket));
}

async function onAddQuoteComment(request, socket) {
  const {
    quoteId,
    text,
  } = request;

  const comment = {
    added: new Date(),
    authorId: socket.request.user._id,
    content: text,
  };

  const quoteDoc = await Quote.findOne({_id: quoteId});

  if (!quoteDoc) {
    console.warn(`Could not find quote ${quoteId} to add a comment.`);
    return;
  }

  quoteDoc.comments.push(comment);
  await quoteDoc.save();

  pushSingleQuoteUpdate(quoteDoc.toObject());
}

async function onDeleteQuoteComment(request, socket) {
  const commentId = ObjectId(request.id);

  const quoteDoc = await Quote.findQuoteByComment(commentId);

  if (!quoteDoc) {
    console.warn(`Could not find quote containing comment ${commentId} to delete comment.`);
    return;
  }

  // Extract the comment
  let comment = quoteDoc.getCommentById(commentId);

  // Make sure the user has permission to edit it
  const userId = socket.request.user._id;
  if (!userCanModifyComment(comment, userId)) {
    console.warn(`User ${userId} attempting to edit comment ${commentId}, which was not created by that user.`);
    return;
  }

  // Remove the comment in question
  quoteDoc.comments = quoteDoc.comments.filter(c => c !== comment);

  // Save the quote
  await quoteDoc.save();

  pushSingleQuoteUpdate(quoteDoc.toObject());
}

async function onUpdateQuoteComment(request, socket) {
  const {
    id: commentId,
    content,
  } = request;

  const quoteDoc = await Quote.findQuoteByComment(commentId);

  if (!quoteDoc) {
    console.warn(`Could not find quote containing comment ${commentId} to delete comment.`);
    return;
  }

  // Extract the comment
  let comment = quoteDoc.getCommentById(commentId);

  // Make sure the user has permission to edit it
  const userId = socket.request.user._id;
  if (!userCanModifyComment(comment, userId)) {
    console.warn(`User ${userId} attempting to edit comment ${commentId}, which was not created by that user.`);
    return;
  }

  comment.content = content;
  comment.lastEdited = new Date();

  await quoteDoc.save();

  pushSingleQuoteUpdate(quoteDoc.toObject());
}

function indexOf(iter, checkFn) {
  for (let i = 0; i < iter.length; ++i)
    if (checkFn(iter[i]))
      return i;
  return -1;
}

function userCanModifyComment(comment, userId) {
  return comment.authorId.equals(userId);
}

async function onToggleCommentLike(request, socket) {
  const commentId = request.id;
  const userId = socket.request.user._id;

  const quoteDoc = await Quote.findQuoteByComment(commentId);

  if (!quoteDoc) {
    console.warn(`Could not find quote containing comment ${commentId} to delete comment.`);
    return;
  }

  const comment = quoteDoc.getCommentById(commentId);
  toggleLike(comment, userId);

  await quoteDoc.save();

  pushSingleQuoteUpdate(quoteDoc.toObject());
}

async function onToggleQuoteLike(request, socket) {
  const quoteId = request.id;
  const userId = socket.request.user._id;

  const quoteDoc = await Quote.findById(quoteId);

  if (!quoteDoc) {
    console.warn(`Could not find quote ${quoteId}.`);
    return;
  }

  toggleLike(quoteDoc, userId);

  await quoteDoc.save();

  pushSingleQuoteUpdate(quoteDoc.toObject());
}

function toggleLike(doc, userId) {
  const likeIdx = indexOf(doc.likes, l => l.personId.equals(userId));
  if (likeIdx >= 0) {
    // The user has liked the comment, so remove the like
    doc.likes.splice(likeIdx, 1);
  } else {
    // The user has not liked the comment, so add a like
    doc.likes.push({
      personId: userId,
      date: new Date(),
    });
  }
}

function pushBoardUpdate(boardData) {
  _io.emit('boardUpdate', boardData);
}

function pushSingleQuoteUpdate(quoteData) {
  _io.emit('singleQuoteUpdate', quoteData);
}

// eslint-disable-next-line no-unused-vars
function onDisconnect(socket) {
  console.log('Client disconnected');
}
