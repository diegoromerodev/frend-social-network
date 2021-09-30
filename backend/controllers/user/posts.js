const { body, validationResult } = require("express-validator");
const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public/images");
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log("HERE IS FILE", file);
    if (file.mimetype.split("/")[0] !== "image") return cb(null, false);
    cb(null, true);
  },
});

/* USER POSTS ACTIONS */
const Post = require("../../models/post");

exports.user_posts_get = (req, res, next) => {
  Post.find()
    .where("author")
    .equals(req.params.userId)
    .exec((err, posts) => {
      if (err) return next(err);
      if (!posts.length) return next(404);
      res.json(posts);
    });
};

exports.user_post_one_get = (req, res, next) => {
  Post.findById(req.params.postId)
    .where("author")
    .equals(req.params.userId)
    .exec((err, post) => {
      if (err) return next(err);
      if (!post) return next(404);
      res.json(post);
    });
};

exports.user_posts_new_post = [
  upload.single("image"),
  body("text", "Post text can't be empty").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    if (req.user._id.toString() !== req.params.userId)
      return res.status(401).json("Unauthorized");
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    new Post({
      text: req.body.text,
      author: req.user,
      image: req.file?.filename,
      heading: req.body.heading,
    }).save((err, post) => {
      if (err) return next(err);
      const newPost = post.toObject();
      delete newPost.author.password;
      delete newPost.author.email;
      delete newPost.author.facebookId;
      res.json(newPost);
    });
  },
];

exports.user_posts_update_put = [
  upload.single("image"),
  body("text", "Post text can't be empty").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    if (req.user._id.toString() !== req.params.userId)
      return res.status(401).json("Unauthorized");
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    Post.findById(req.params.postId)
      .where("author")
      .equals(req.params.userId)
      .exec((err, post) => {
        if (err) return next(err);
        if (!post) return next(404);
        post.text = req.body.text;
        post.author = req.user;
        if (req.file) post.image = req.file.filename;
        post.heading = req.body.heading;
        post.date = req.body.date;
        post.save();
        delete req.user.password;
        delete req.user.email;
        res.json(post.toObject());
      });
  },
];

exports.user_posts_delete = (req, res, next) => {
  Post.findOne({ author: req.params.userId, _id: req.params.postId })
    .deleteOne()
    .exec((err) => {
      if (err) return next(err);
      res.json(`DELETED ${req.params.postId}`);
    });
};
