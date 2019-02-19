import passport from 'passport';
import googleOAuth2 from 'passport-google-oauth2';
import passportFacebook from 'passport-facebook';
const GoogleStrategy = googleOAuth2.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
import {
  GOOGLE_CONFIG, FACEBOOK_CONFIG
} from './oauth-config';

export default () => {

  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));

  // The function that is called when an OAuth provider sends back user
  // information.  Normally, you would save the user to the database here
  // in a callback that was customized for each provider.
  const callback = (accessToken, refreshToken, profile, cb) => cb(null, profile);

  // Adding each OAuth provider's strategy to passport
  passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback));
  passport.use(new FacebookStrategy(FACEBOOK_CONFIG, callback));
}