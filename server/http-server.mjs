// This file handles all HTTP requests

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import http from 'http';
import https from 'https';
import session from 'express-session';

import passportInit from './passport-init.mjs';
import router from './http-router.mjs'


export default class HttpServer {
  constructor(port, sessionSecret, sessionStore) {
    // Start the HTTP server
    this.app = express();
    this.app.use(cors({
      origin: 'https://secure-dev.kylecombes.com:8080',
      credentials: true,
    }));

    if (process.env.SSL_KEY && process.env.SSL_CERT) {
      const certOptions = {
        key: fs.readFileSync(process.env.SSL_KEY),
        cert: fs.readFileSync(process.env.SSL_CERT),
      };
      console.info('Found SSL certificate. Launching HTTPS server...');
      this.server = https.createServer(certOptions, this.app);
    } else {
      console.info('Could not find SSL certificate. Launching HTTP server...');
      this.server = http.createServer(this.app);
    }

    this.app.use(session({
      key: 'connect.sid',
      cookie: {
        secure: !process.env.DEBUG,
        maxAge: 2419200000,
      },
      proxy: !!process.env.USING_PROXY,
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
