const User = require('../../models/user');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const FacebookTokenStrategy = require('passport-facebook-token');
const passport = require('passport');
require('dotenv').config();

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ email: username }).lean().exec((err, doc) => {
    if (err) return done(err);
    if (!doc) return done(null, false);
    if (doc.password !== password) {
      return done(null, false);
    }
    return done(null, doc);
  });
}));

passport.use(new JWTStrategy({
  secretOrKey: process.env.secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
}, (payload, done) => {
  User.findById(payload._id).exec((err, user) => {
    if (err) return done(err, false);
    if (!user) return done(null, false);
    return done(null, user);
  });
}));

passport.use(new FacebookTokenStrategy({
  clientID: process.env.appId,
  clientSecret: process.env.appSecret,
  fbGraphVersion: 'v3.0',
}, ((accessToken, refreshToken, profile, done) => {
  if (!profile) return done(null, false);
  User.findOne({ facebookId: profile.id }).exec(async (err, user) => {
    if (err) return done(err, false);
    if (!user) {
      const newUser = User({
        email: profile.emails[0].value,
        facebookId: profile.id,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        birthday: profile.birthday || new Date(0),
        profile_photo: profile.photos[0].value,
      });
      return done(null, newUser);
    }
    return done(null, user);
  });
})));
