import express from 'express';
import passport from 'passport';
import expose from "./expose";
import authController from './auth-controller';
// import indexHTML from '../index.html.mjs';
const router = express.Router();

// Current hack with Node and experimental modules
// eslint-disable-next-line no-underscore-dangle
const fullPath = expose.__dirname.split('/');
fullPath.pop();
const rootDir = fullPath.join('/');

// Setting up the passport middleware for each of the OAuth providers
const googleAuth = passport.authenticate('google', { scope: ['profile'] });
const facebookAuth = passport.authenticate('facebook');

// This custom middleware allows us to attach the socket id to the session.
// With the socket id attached we can send back the right user info to
// the right socket
const addSocketIdtoSession = (req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
};

router.get('/bundle.js', (req, res) => {
  res.sendFile(`${rootDir}/bundle.js`);
});

// Routes that are triggered by the React client
router.get('/google', addSocketIdtoSession, googleAuth);
router.get('/facebook', addSocketIdtoSession, facebookAuth);

// Routes that are triggered by callbacks from OAuth providers once
// the user has authenticated successfully
router.get('/google/callback', googleAuth, authController.google);
router.get('/facebook/callback', facebookAuth, authController.facebook);

export default router;