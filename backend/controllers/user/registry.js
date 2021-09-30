const { body, validationResult } = require("express-validator");
const upload = require("../../lib/media/imageUpload");
const User = require("../../models/user");

/* USER REGISTRY OPERATIONS */

exports.users_all_get = (req, res, next) => {
  User.find().exec((err, users) => {
    if (err) return next(err);
    if (!users.length) return next(404);
    res.json(users);
  });
};

exports.users_new_post = [
  upload.single("photo"),
  body("first_name", "First name can't be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("last_name", "Last name can't be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password can't be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("email", "Email is required").trim().isEmail().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      birthday: req.body.birthday || new Date(0),
      profile_photo: req.file.filename,
    }).save((err, user) => {
      if (err) return next(err);
      res.json(user.toObject());
    });
  },
];

exports.users_one_get = (req, res, next) => {
  if (req.user._id.toString() !== req.params.userId)
    return res.status(401).json("Unauthorized");
  User.findById(req.params.userId).exec((err, user) => {
    if (err) return next(err);
    const foundUser = user.toObject();
    delete foundUser.password;
    return res.json(foundUser);
  });
};

exports.users_one_update = [
  body("first_name", "First name can't be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("last_name", "Last name can't be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("email", "Email is required").trim().isEmail().escape(),
  (req, res, next) => {
    if (req.user._id.toString() !== req.params.userId)
      return res.status(401).json("Unauthorized");
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    const userUpdates = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      birthday: req.body.birthday || new Date(0),
    };
    if (req.file) userUpdates.profile_photo = req.file.filename;
    User.findByIdAndUpdate(req.params.userId, userUpdates, (err, user) => {
      if (err) return next(err);
      const updatedUser = user.toObject();
      delete updatedUser.password;
      res.json(updatedUser);
    });
  },
];

exports.users_one_delete = (req, res, next) => {
  if (req.user._id.toString() !== req.params.userId)
    return res.status(401).json("Unauthorized");
  User.findByIdAndDelete(req.params.userId, {}, (err, user) => {
    if (err) return next(err);
    const deletedUser = user.toObject();
    delete deletedUser.password;
    res.json(deletedUser);
  });
};
