const { body, validationResult } = require("express-validator");
const async = require("async");
const upload = require("../../lib/media/imageUpload");
const User = require("../../models/user");
const Post = require("../../models/post");

/* USER POSTS ACTIONS */

exports.user_feed_get = (req, res, next) => {
  async.waterfall(
    [
      (callback) => {
        User.findById(req.params.userId).select("friends").exec(callback);
      },
      ({ friends }, callback) => {
        Post.where("author")
          .in(friends)
          .sort({ created_at: -1 })
          .exec(callback);
      },
    ],
    (err, posts) => {
      if (err) return next(err);
      res.json(posts);
    }
  );
};

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
