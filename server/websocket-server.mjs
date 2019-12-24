import SocketIO from 'socket.io';
import cookieParser from 'cookie-parser';
import mongodb from 'mongodb';
import passport from 'passport';
import passportSocketIo from 'passport.socketio';
import Board from './models/board.mjs';
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
    socket.on('addQuote', quoteData => onAddQuote(quoteData, socket));
    socket.on('addQuoteComment', commentData => onAddQuoteComment(commentData, socket));
    socket.on('deleteQuoteComment', request => onDeleteQuoteComment(request, socket));
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

async function onDeleteQuoteComment(request) {
  const commentId = ObjectId(request.id);

  const quoteDoc = await Quote.findOne({comments: {$elemMatch: {_id: commentId}}});

  if (!quoteDoc) {
    console.warn(`Could not find quote containing comment ${commentId} to delete comment.`);
    return;
  }

  quoteDoc.comments = quoteDoc.comments.filter(c => !c._id.equals(commentId));

  await quoteDoc.save();

  pushSingleQuoteUpdate(quoteDoc.toObject());
}

async function onUpdateQuoteComment(request) {
  const {
    id: commentId,
    content,
  } = request;

  const quoteDoc = await Quote.findOne({comments: {$elemMatch: {_id: commentId}}});

  if (!quoteDoc) {
    console.warn(`Could not find quote containing comment ${commentId} to delete comment.`);
    return;
  }

  for (let i = 0; i < quoteDoc.comments.length; ++i) {
    if (quoteDoc.comments[i]._id.equals(commentId)) {
      quoteDoc.comments[i].content = content;
      break;
    }
  }

  await quoteDoc.save();

  pushSingleQuoteUpdate(quoteDoc.toObject());
}

function pushSingleQuoteUpdate(quoteData) {
  _io.emit('singleQuoteUpdate', quoteData);
}

// eslint-disable-next-line no-unused-vars
function onDisconnect(socket) {
  console.log('Client disconnected');
}
