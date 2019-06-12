// This file handles all HTTP requests

import cors from 'cors';
import express from 'express';
import fs from 'fs';
import https from 'https';
import passport from 'passport';
import session from 'express-session';

import passportInit from './passport-init.mjs';
import router from './http-router'


export default class HttpServer {
  constructor(port, sessionSecret, sessionStore) {
    // Start the HTTP server
    this.app = express();
    const certOptions = {
      key: fs.readFileSync('secure-dev.kylecombes.com.key'),
      cert: fs.readFileSync('secure-dev.kylecombes.com.cert'),
    };
    this.server = https.createServer(certOptions, this.app);

    this.app.use(session({
      cookie: {
        secure: process.env.ENVIRONMENT !== 'development' && process.env.ENVIRONMENT !== 'test',
        maxAge: 2419200000,
      },
      store: sessionStore,
      secret: sessionSecret,
      resave: true,
      saveUninitialized: true,
    }));

    this.app.use(cors());

    this.app.use(passport.initialize());
    passportInit();

    this.app.use('/', router);

    // this.app.use(express.json);
    this.server.listen(port, () => console.log(`HTTPS server listening on port ${port}`));


  }

  getHTTPServer() {
    return this.server;
  }

  getExpressApp() {
    return this.app;
  }
}
