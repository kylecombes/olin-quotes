// This file is responsible for connecting to and interacting with the MongoDB database.

import mongoose from 'mongoose';

let _db;
let _connected = false;

export function connectDb() {
  // Connect to the MongoDB database
  const username = process.env.MONGO_USERNAME;
  const password = process.env.MONGO_PASSWORD;
  const cluster = process.env.MONGO_CLUSTER;
  const dbName = process.env.MONGO_DB_NAME;

  return new Promise((resolve, reject) => {

    // Check to make sure we have the information we need to connect
    if (!(username && password && cluster && dbName)) {
      // Couldn't find environment variables
      reject(`Please check your environment variables to make sure the following are defined:
        \t- MONGO_USERNAME
        \t- MONGO_PASSWORD
        \t- MONGO_CLUSTER
        \t- MONGO_DB_NAME
        Connection to MongoDB failed.`);
    } else {
      // We have all the information we need to connect, so attempt to do so
      const mongoUri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}`;

      return mongoose.connect(mongoUri, { useNewUrlParser: true })
        .then(db => {
          _db = db;
          _connected = true;
          console.log('Connected to MongoDB database');
          resolve(_db);
        })
        .catch(error => reject(error));
    }
  });
}

export function getDb() {
  return _db;
}

/**
 * Check to see if we are currently connected to the database.
 * @return {boolean} whether or not a connection to the database is currently open
 */
export function dbConnected() {
  return _connected;
}
