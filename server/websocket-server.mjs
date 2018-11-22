import SocketIO from 'socket.io';

export default class WebSocketServer {
  constructor(dbConn) {
    this.io = null;
    this.dbConn = dbConn;
    this.onConnect = this.onConnect.bind(this);
    this.onAddPerson = this.onAddPerson.bind(this);
    this.onAddQuote = this.onAddQuote.bind(this);
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
    const that = this;
    this.dbConn.db.collection('people').find({}).toArray((err, res) => {
      if (!err) {
        const people = {};
        res.forEach(person => {
          people[person._id] = person;
        });
        console.log('Sending people update...');
        socket.emit('peopleUpdate', people);
        that.dbConn.db.collection('quotes').find({}).toArray((err, res) => {
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
    this.dbConn.db.collection('people').insertOne(personData, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        that.dbConn.db.collection('people').find({}).toArray((err, res) => {
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
    this.dbConn.db.collection('quotes').insertOne(quoteData, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        that.dbConn.db.collection('quotes').find({}).toArray((err, res) => {
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

  // eslint-disable-next-line no-unused-vars
  static onDisconnect(socket) {
    console.log('Client disconnected');
  }

}
