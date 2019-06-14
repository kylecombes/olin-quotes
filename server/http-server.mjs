// This file handles all HTTP requests

import express from 'express';
import fs from 'fs';
import https from 'https';
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
      key: 'connect.sid',
      cookie: {
        secure: !process.env.DEBUG,
        maxAge: 2419200000,
      },
      store: sessionStore,
      secret: sessionSecret,
      resave: true,
      saveUninitialized: false,
    }));

    passportInit(this.app);

    this.app.use('/', router);

    this.server.listen(port, () => console.log(`HTTPS server listening on port ${port}`));

  }

  getHTTPServer() {
    return this.server;
  }

  getExpressApp() {
    return this.app;
  }
}
