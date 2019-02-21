import { getDb } from './database.mjs';

const USER_COLLECTION = 'people';

export function findUserByFacebookId(fbId) {
  const db = getDb();

  const filter = {
    connectedAccounts: {
      facebook: {
        id: fbId,
      },
    },
  };

  db.collection(USER_COLLECTION).findOne(filter, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res);
    }
  })
}

export function findUserByGoogleId(fbId) {
  return new Promise((resolve, reject) => {
    const db = getDb();

    const filter = {
      connectedAccounts: {
        google: {
          id: fbId,
        },
      },
    };

    db.collection(USER_COLLECTION).findOne(filter, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  });
}

export function getUserDetails(id) {

}
