const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.facebook_auth = (req, res, next) => {
  passport.authenticate("facebook-token", (err, user) => {
    if (err) return next(err);
    if (!user) return next(new Error(404));
    if (req.body.profile_photo && !user.profile_photo) {
      user.profile_photo = req.body.profile_photo;
    }
    user.save((error, doc) => {
      if (err) return next(error);
      const foundUser = doc.toObject();
      delete foundUser.password;
      delete foundUser.email;
      const payload = {
        token: jwt.sign(doc._doc, process.env.secret),
        user: foundUser,
      };
      return res.json(payload);
    });
  })(req, res);
};

exports.local_auth = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (!user) return next(new Error(401));
    const foundUser = user;
    delete foundUser.password;
    delete foundUser.email;
    const payload = {
      token: jwt.sign(user, process.env.secret),
      user: foundUser,
    };
    return res.json(payload);
  })(req, res);
};

exports.validate_token = passport.authenticate("jwt", { session: false });
