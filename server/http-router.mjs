import express from 'express';
import passport from 'passport';
import expose from "./expose";
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

const logInUser = (req, res) => {
  const { user } = req;
  req.session.user = user;
  const socketId = req.session.socketId;
  const socket = req.app.get('io').in(socketId);

  if (user.accountSetupComplete) { // Found user in db
    socket.emit('loggedIn', user);
  } else { // No user in db, prompt account creation
    socket.emit('loggedIn', user);
    // TODO: Prompt account setup wizard on client
  }
  // Close the popup
  // res.send('Login successful');
  res.send('<html><body><script type="text/javascript">window.close()</script></body></html>');
};

const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(401); // Not authorized
  }
};

router.get('/', (req, res) => res.sendFile(`${rootDir}/server/index.html`));

router.get('/bundle.js', (req, res) => {
  res.sendFile(`${rootDir}/bundle.js`);
});

router.get('/bundle.js.map', (req, res) => {
  res.sendFile(`${rootDir}/bundle.js.map`);
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Routes that are triggered by the React client
router.get('/google', addSocketIdtoSession, googleAuth);
router.get('/facebook', addSocketIdtoSession, facebookAuth);

// Routes that are triggered by callbacks from OAuth providers once
// the user has authenticated successfully
router.get('/google/callback', googleAuth, logInUser);
router.get('/facebook/callback', facebookAuth, logInUser);

export default router;