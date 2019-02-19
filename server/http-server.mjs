// This file handles all HTTP requests

import express from 'express';
import fs from 'fs';
import https from 'https';
import passport from 'passport';
import session from 'express-session';

import passportInit from './passport-init.mjs';
import router from './http-router';

export default class HttpServer {
  constructor(port, sessionSecret) {
    // Start the HTTP server
    this.app = express();
    const certOptions = {
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.cert'),
    };
    this.server = https.createServer(certOptions, this.app);

    this.app.use(passport.initialize());
    passportInit();

    this.app.use(session({
      secret: sessionSecret,
      resave: true,
      saveUninitialized: true,
    }));

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
