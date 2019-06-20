// Try loading environment variables from a .env file
import fs from "fs";
import dotenv from "dotenv";

if (fs.existsSync('./.env')) {
  dotenv.config();
}

const providers = ['google', 'facebook'];

const callbacks = providers.map(provider => `${process.env.SERVER_URI}/${provider}/callback`);

const [googleURL, facebookURL] = callbacks;

export const GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: googleURL
};

export const FACEBOOK_CONFIG = {
  clientID: process.env.FACEBOOK_KEY,
  clientSecret: process.env.FACEBOOK_SECRET,
  profileFields: ['id', 'emails', 'name', 'picture.width(250)'],
  callbackURL: facebookURL
};