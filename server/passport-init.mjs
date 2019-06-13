import passport from 'passport';
import googleOAuth2 from 'passport-google-oauth2';
import passportFacebook from 'passport-facebook';
const GoogleStrategy = googleOAuth2.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
import { findUserByGoogleId } from './user.mjs';
import {
  GOOGLE_CONFIG, FACEBOOK_CONFIG
} from './oauth-config';

export default app=> {

  app.use(passport.initialize());
  app.use(passport.session());

  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, done) => {
    done(null, user.id)
  });
  passport.deserializeUser((id, done) => {
    findUserByGoogleId(id)
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  // The function that is called when an OAuth provider sends back user
  // information.  Normally, you would save the user to the database here
  // in a callback that was customized for each provider.
  const callback = (accessToken, refreshToken, profile, done) => done(null, profile);

  // Adding each OAuth provider's strategy to passport
  passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback));
  passport.use(new FacebookStrategy(FACEBOOK_CONFIG, callback));
}