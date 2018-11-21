import SocketIO from 'socket.io';

export default class WebSocketServer {
  constructor(dbConn) {
    this.io = null;
    this.dbConn = dbConn;
    this.onConnect = this.onConnect.bind(this);
  }

  start(httpServer) {
    this.io = new SocketIO(httpServer);
    this.io.on('connection', this.onConnect);

    console.log('WebSocket server started successfully.');
  }

  onConnect(socket) {
    console.log('Client connected');
    this.dbConn.db.collection('people').find({}).toArray((err, res) => {
      if (!err) {
        const people = {};
        res.forEach(person => {
          people[person._id] = person;
        });
        console.log('Sending people update...');
        socket.emit('peopleUpdate', people);
        this.dbConn.db.collection('quotes').find({}).toArray((err, res) => {
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

  // eslint-disable-next-line no-unused-vars
  static onDisconnect(socket) {
    console.log('Client disconnected');
  }

}
