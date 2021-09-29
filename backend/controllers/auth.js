const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.facebook_auth = (req, res, next) => {
  (passport.authenticate('facebook-token', (err, user) => {
    if (err) return next(err);
    if (!user) return next(new Error(404));
    if (req.body.profilePhoto) {
      user.profile_photo = req.body.profilePhoto;
    }
    user.save((error, doc) => {
      if (err) return next(error);
      return res.json(jwt.sign(doc._doc, process.env.secret));
    });
  }))(req, res);
};

exports.local_auth = (req, res, next) => {
  (passport.authenticate('local', (err, user) => {
    if (!user) return next(new Error(401));
    return res.json(jwt.sign(user, process.env.secret));
  }))(req, res);
};

exports.validate_token = passport.authenticate('jwt', { session: false });
