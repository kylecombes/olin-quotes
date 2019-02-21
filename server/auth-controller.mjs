import {
  findUserByFacebookId,
  findUserByGoogleId,
} from './user';
import {
  promptAccountCreation,
  saveData,
} from './websocket-server';

const google = (req, res) => {
  findUserByGoogleId(req.user.id)
    .then(userData => {
      const socketId = req.session.socketId;
      const socket = req.app.get('io').in(socketId);

      if (userData) { // Found user in db
        attemptLogin(userData, socket);
      } else { // No user in db, prompt account creation
        saveData(socketId, 'attachedAccountData', {
          google: {
            id: req.user.id,
          },
        });
        userData = {
          displayName: req.user.displayName,
          firstName: req.user.name.givenName,
          lastName: req.user.name.familyName,
          avatarUrl: req.user.photos[0].value.replace(/sz=50/gi, 'sz=250'),
        };
        promptAccountCreation(userData, socket);
      }
    });
};

const facebook = (req, res) => {
  const id = findUserByFacebookId(req.user.id);
  const { givenName, familyName } = req.user.name;
  const user = {
    name: `${givenName} ${familyName}`,
    photo: req.user.photos[0].value
  };
  const socketId = req.session.socketId;
  const socket = req.app.get('io').in(socketId);
  saveData(socketId, 'attachedAccountData', {
    facebook: {
      id: req.user.id,
    },
  });

  attemptLogin(user,  'facebook', socket);
};

const attemptLogin = (userData, socket) => {
  // TODO: Log in
  socket.emit('loggedIn', userData);
};

export default { google, facebook };