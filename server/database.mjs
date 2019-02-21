// This file is responsible for connecting to and interacting with the MongoDB database.

import MongoClient from 'mongodb';

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

      MongoClient.connect(mongoUri, { useNewUrlParser: true }, function (err, client) {
        if (err) {
          reject(`Error connecting to MongoDB instance:\n${err}`);
        } else {
          console.log('Successfully connected to MongoDB instance.');
          _db = client.db(dbName);
          _connected = true;
          _db.on('close', () => {
            console.log('Lost connection to MongoDB instance. Attempting to reconnect...');
            _connected = false;
          });
          _db.on('reconnect', () => {
            console.log('Successfully reconnected to MongoDB instance.');
            _connected = true;
          });
          resolve(_db);
        }
      });
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
