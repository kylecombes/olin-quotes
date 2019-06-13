import connectRedis from 'connect-redis';
import dotenv from 'dotenv';
import fs from 'fs';
import redisUrl from "redis-url";
import session from 'express-session';

import { connectDb } from './database.mjs';
import HttpServer from './http-server.mjs';
import { startWebSocketServer } from './websocket-server.mjs';

const RedisStore = connectRedis(session);

// Try loading environment variables from a .env file
if (fs.existsSync('./.env')) {
  dotenv.config();
}

// Figure out which port we're going to be listening for connections on
const port = process.env.PORT || 1234;

const sessionStore = new RedisStore({
  client: redisUrl.connect(process.env.REDIS_URL)
});


// Connect to MongoDB
new connectDb()
  .then(() => {
    // Start the HTTP server
    const httpServer = new HttpServer(port, process.env.SESSION_SECRET, sessionStore);

    // Start the WebSockets server
    startWebSocketServer(httpServer.getHTTPServer(), httpServer.getExpressApp(), sessionStore);

  })
  .catch(err => console.error(err));
