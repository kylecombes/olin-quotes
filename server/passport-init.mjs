import passport from 'passport';
import googleOAuth2 from 'passport-google-oauth2';
import passportFacebook from 'passport-facebook';
const GoogleStrategy = googleOAuth2.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
import User from './models/user';
import {
  GOOGLE_CONFIG, FACEBOOK_CONFIG
} from './oauth-config';

export default app => {

  app.use(passport.initialize());
  app.use(passport.session());

  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, done) => {
    User.findById();
    done(null, user.id)
  });
  passport.deserializeUser((id, done) => {
    done(id);
  //   findUserByGoogleId(id)
  //     .then(user => done(null, user))
  //     .catch(err => done(err));
  });

  // The function that is called when an OAuth provider sends back user
  // information.  Normally, you would save the user to the database here
  // in a callback that was customized for each provider.
  const callback = (accessToken, refreshToken, profile, done) => done(null, profile);

  // Adding each OAuth provider's strategy to passport
  passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback));
  passport.use(new FacebookStrategy(FACEBOOK_CONFIG, callback));
}