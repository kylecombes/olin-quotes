import SocketIO from 'socket.io';

export default class WebSocketServer {
  constructor() {
    this.io = null;
  }

  start(httpServer) {
    this.io = new SocketIO(httpServer);

    console.log('WebSocket server started successfully.');
  }

  // eslint-disable-next-line no-unused-vars
  static onDisconnect(socket) {
    console.log('Client disconnected');
  }

}
