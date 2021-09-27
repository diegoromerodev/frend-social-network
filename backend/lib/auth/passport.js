const User = require('../../models/user');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
// require('dotenv').config();

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username }).exec((err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    if (user.password !== password) {
      return done(null, false);
    }
    return done(null, user);
  });
}));

passport.use(new JWTStrategy({
  secretOrKey: process.env.secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
}, (payload, done) => {
  User.findById(payload._id).exec((err, user) => {
    if (err) return done(err, false);
    if (!user) return done(null, false);
    return done(null, user);
  });
}));

passport.use(new FacebookStrategy({
  clientID: process.env.appId,
  clientSecret: process.env.appSecret,
  callbackURL: 'https//frend-social.herokuapp.com/auth/callback',

}, (accessToken, refreshToken, profile, cb) => {
  User.find({ facebookId: profile.id }).exec((err, user) => {
    console.log(profile);
  });
  return cb(err, user);
}));
