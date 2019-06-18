import SocketIO from 'socket.io';
import cookieParser from 'cookie-parser';
import mongodb from 'mongodb';
import passport from 'passport';
import passportSocketIo from 'passport.socketio';
import User from './models/user';
import Quote from './models/quote';
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
  if (socket.request.user && socket.request.user.logged_in) {
    console.log('Authenticated client connected');
    socket.emit('loggedIn', socket.request.user);
  } else {
    console.log('Unauthenticated client connected');
  }
  socket.on('createUserAccount', userData => onCreateUserAccount(userData, socket));
  socket.on('addQuote', onAddQuote);
  socket.on('addQuoteComment', onAddQuoteComment);
  User.find().lean().exec((err, res) => {
    if (!err) {
      const people = {};
      res.forEach(person => {
        people[person._id] = person;
      });
      console.log('Sending people update...');
      socket.emit('peopleUpdate', people);
      Quote.find().lean().exec((err, res) => {
        if (!err) {
          const quotes = {};
          res.forEach(quote => {
            quotes[quote._id] = quote;
          });
          console.log('Sending quotes update...');
          socket.emit('quotesUpdate', quotes);
        }
      });
    }
  });
}

// TODO: Add object field checking to ensure not just anything sent from the frontend can be added the db
function onCreateUserAccount(userData, socket) {
  console.log('Adding person...');
  console.log(connectedAccounts);
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

// TODO: Add object field checking to ensure not just anything sent from the frontend can be added the db
function onAddQuote(quoteData) {
  console.log('Adding quote...');
  _db.collection('quotes').insertOne(quoteData, err => {
    if (err) {
      console.log(err);
    } else {
      _db.collection('quotes').find({}).toArray((err, res) => {
        if (!err) {
          const quotes = {};
          res.forEach(person => {
            quotes[person._id] = person;
          });
          console.log('Sending quotes update...');
          _io.emit('quotesUpdate', quotes);
        }
      });
    }
  });
}

function onAddQuoteComment(request) {
  const {
    quoteId,
    text,
  } = request;

  const filter = { _id: ObjectId(quoteId) };

  const comment = {
    // authorId: ObjectId(authorId), TODO: Implement this with authentication/accounts
    text,
  };

  _db.collection('quotes').update(filter, {$push: {comments: comment}}, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      _io.collection('quotes').findOne(filter, (err, res) => {
        if (err) {
          console.error(err);
        } else {
          pushSingleQuoteUpdate(res);
        }
      });
    }
  });

}

function pushSingleQuoteUpdate(quoteData) {
  this.io.emit('singleQuoteUpdate', quoteData);
}

// eslint-disable-next-line no-unused-vars
function onDisconnect(socket) {
  console.log('Client disconnected');
}
