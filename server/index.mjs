import connectRedis from 'connect-redis';
import dotenv from 'dotenv';
import fs from 'fs';
import redisUrl from "redis-url";
import session from 'express-session';
import ApolloServer from 'apollo-server';
import typeDefs from './schema.mjs';
import BoardAPI from './datasources/board.mjs';
import QuotesAPI from './datasources/quotes.mjs';
import UserAPI from './datasources/user.mjs';
import resolvers from './resolvers.mjs';

// Try loading environment variables from a .env file
if (fs.existsSync('./.env')) {
  dotenv.config();
}

import { connectDb, getDb } from './database.mjs';
import User from './models/user.mjs';
import HttpServer from './http-server.mjs';
import { startWebSocketServer } from './websocket-server.mjs';

const RedisStore = connectRedis(session);

// Figure out which port we're going to be listening for connections on
const port = process.env.PORT || 1234;

const sessionStore = new RedisStore({
  client: redisUrl.connect(process.env.REDIS_URL)
});


// Connect to MongoDB
connectDb()
  .then(() => {
    // Start the HTTP server
    const httpServer = new HttpServer(port, process.env.SESSION_SECRET, sessionStore);

    // Start the WebSockets server
    startWebSocketServer(httpServer.getHTTPServer(), httpServer.getExpressApp(), sessionStore);

    // Start Apollo GraphQL server
    const store = getDb();
    new ApolloServer.ApolloServer({
      context: async ({ req }) => {
        // Simple auth check on every request
        const auth = (req.headers && req.headers.authorization) || '';
        const id = new Buffer(auth, 'base64').toString('ascii');

        let user;
        // Check if the ID is a valid MongoDB ObjectId
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          user = await User.findOne({_id: id});
        }
        return { user };
      },
      dataSources: () => ({
        boardAPI: new BoardAPI({ store }),
        quotesAPI: new QuotesAPI({ store }),
        userAPI: new UserAPI({ store }),
      }),
      resolvers,
      typeDefs,
    })
      .listen()
      .then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
      });
  })
  .catch(err => console.error(err));
