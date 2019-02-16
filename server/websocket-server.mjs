import SocketIO from 'socket.io';
import mongodb from 'mongodb';
const { ObjectId } = mongodb; // Single-line import not working

export default class WebSocketServer {
  constructor(dbConn) {
    this.io = null;
    this.db = dbConn;
    this.onConnect = this.onConnect.bind(this);
    this.onAddPerson = this.onAddPerson.bind(this);
    this.onAddQuote = this.onAddQuote.bind(this);
    this.onAddQuoteComment = this.onAddQuoteComment.bind(this);
  }

  start(httpServer) {
    this.io = new SocketIO(httpServer);
    this.io.on('connection', this.onConnect);

    console.log('WebSocket server started successfully.');
  }

  onConnect(socket) {
    console.log('Client connected');
    socket.on('addPerson', this.onAddPerson);
    socket.on('addQuote', this.onAddQuote);
    socket.on('addQuoteComment', this.onAddQuoteComment);
    const that = this;
    this.db.collection('people').find({}).toArray((err, res) => {
      if (!err) {
        const people = {};
        res.forEach(person => {
          people[person._id] = person;
        });
        console.log('Sending people update...');
        socket.emit('peopleUpdate', people);
        that.db.collection('quotes').find({}).toArray((err, res) => {
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
  onAddPerson(personData) {
    console.log('Adding person...');
    const that = this;
    this.db.collection('people').insertOne(personData, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        that.db.collection('people').find({}).toArray((err, res) => {
          if (!err) {
            const people = {};
            res.forEach(person => {
              people[person._id] = person;
            });
            console.log('Sending people update...');
            that.io.emit('peopleUpdate', people);
          }
        });
      }
    });
  }

  // TODO: Add object field checking to ensure not just anything sent from the frontend can be added the db
  onAddQuote(quoteData) {
    console.log('Adding quote...');
    const that = this;
    this.db.collection('quotes').insertOne(quoteData, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        that.db.collection('quotes').find({}).toArray((err, res) => {
          if (!err) {
            const quotes = {};
            res.forEach(person => {
              quotes[person._id] = person;
            });
            console.log('Sending quotes update...');
            that.io.emit('quotesUpdate', quotes);
          }
        });
      }
    });
  }

  onAddQuoteComment(request) {
    const {
      quoteId,
      text,
    } = request;

    const filter = { _id: ObjectId(quoteId) };

    const comment = {
      // authorId: ObjectId(authorId), TODO: Implement this with authentication/accounts
      text,
    };

    this.db.collection('quotes').update(filter, {$push: {comments: comment}}, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        this.db.collection('quotes').findOne(filter, (err, res) => {
          if (err) {
            console.error(err);
          } else {
            this.pushSingleQuoteUpdate(res);
          }
        });
      }
    });

  }

  pushSingleQuoteUpdate(quoteData) {
    this.io.emit('singleQuoteUpdate', quoteData);
  }

  // eslint-disable-next-line no-unused-vars
  static onDisconnect(socket) {
    console.log('Client disconnected');
  }

}
