const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const mongoose = require('mongoose');

const User = mongoose.model('users');

const APP_ID = '142661803111160';
const APP_SECRET = '73ad61eb03684fdbcb08ce48e6e02932';

const CALLBACK_URL = '/auth/facebook/callback';

// creates cookie storing user info
passport.serializeUser((user, done) => {
  // user.id here is NOT googleId or facebookId,
  // it is the database ID for this user record
  done(null, user.id);
});
// returns user from stored cookie info
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new FacebookStrategy(
    {
      clientID: APP_ID,
      clientSecret: APP_SECRET,
      callbackURL: CALLBACK_URL,
      // proxy true makes http in redirect stay as https
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ facebookId: profile.id });
      if (user) return done(null, user);

      user = await new User({
        facebookId: profile.id,
        username: profile.displayName
      }).save();
      done(null, user);
    }
  )
);
