import passport from 'passport';
import googleOAuth2 from 'passport-google-oauth2';
import passportFacebook from 'passport-facebook';
const GoogleStrategy = googleOAuth2.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
import User from './models/user.mjs';
import {
  GOOGLE_CONFIG, FACEBOOK_CONFIG
} from './oauth-config.mjs';

export default app => {

  app.use(passport.initialize());
  app.use(passport.session());

  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, done) => {
    done(null, user._id)
  });
  passport.deserializeUser((id, done) => {
    User.findById(id).lean().exec((err, res) => {
      if (err) {
        done(err);
      } else {
        done(null, res);
      }
    });
  });

  // Adding each OAuth provider's strategy to passport
  passport.use(new GoogleStrategy(GOOGLE_CONFIG, (accessToken, refreshToken, profile, done) => {
    const { id } = profile;
    User.findByGoogleId(id).lean().exec((err, res) => {
      if (err) {
        return done(err);
      }
      if (res.length > 0) { // Returning user
        const userData = res[0];
        done(null, userData);
      } else { // New user
        const newUser = new User({
          accountSetupComplete: false,
          avatarUrl: profile.photos[0].value.replace(/sz=50/gi, 'sz=250'),
          connectedAccounts: {
            google: {
              id,
            },
          },
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
        });

        newUser.save();
        console.info(`New user ${profile.displayName} created based on Google account.`);

        done(null, newUser);
      }
    });
  }));
  passport.use(new FacebookStrategy(FACEBOOK_CONFIG, (accessToken, refreshToken, profile, done) => {
    const { id } = profile;
    User.findByFacebookId(id).lean().exec((err, res) => {
      if (err) {
        return done(err);
      }
      if (res.length > 0) { // Returning user
        const userData = res[0];
        done(null, userData);
      } else { // New user
        const {
          givenName,
          familyName,
        } = profile.name;
        const displayName = `${givenName} ${familyName}`;

        const newUser = new User({
          accountSetupComplete: false,
          displayName: displayName,
          firstName: givenName,
          lastName: familyName,
          avatarUrl: profile.photos[0].value,
          connectedAccounts: {
            facebook: {
              id,
            },
          },
        });

        newUser.save();
        console.log(`New user ${displayName} created based on Facebook account.`);

        done(null, newUser);
      }
    })
  }));
}