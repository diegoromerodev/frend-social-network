const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment");
const Notification = require("../models/notification");
const Post = require("../models/post");

exports.posts_all_get = (req, res, next) => {
  Post.find().exec((err, posts) => {
    if (err) return next(err);
    res.json(posts);
  });
};

exports.post_one_get = (req, res, next) => {
  Post.findById(req.params.postId)
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "first_name last_name profile_photo",
      },
    })
    .exec((err, post) => {
      if (err) return next(err);
      if (!post) return next(404);
      res.json(post);
    });
};

/* POST LIKE OPERATIONS */

exports.post_like_post = (req, res, next) => {
  Post.findByIdAndUpdate(
    req.params.postId,
    {
      $addToSet: {
        likes: req.user,
      },
    },
    (err, post) => {
      if (err) return next(err);
      if (!post) return next(404);
      new Notification({
        user: post.author,
        text: "You received a like on your post",
        url: post._id,
      }).save((err, res) => {
        if (err) return next(err);
        io.to(post.author._id.toString()).emit("notification");
      });
      res.json(post);
    }
  );
};

exports.post_like_delete = (req, res, next) => {
  Post.findByIdAndUpdate(
    req.params.postId,
    {
      $pull: {
        likes: req.user._id,
      },
    },
    (err, post) => {
      if (err) return next(err);
      if (!post) return next(404);
      res.json(post);
    }
  );
};

/* POST COMMENT OPERATIONS */

exports.post_comment_new_post = [
  body("text", "Comment text can't be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);

    const newComment = new Comment({
      author: req.user,
      post: req.params.postId,
      text: req.body.text,
    });
    newComment.save((err) => {
      if (err) return next(err);
    });
    Post.findByIdAndUpdate(req.params.postId, {
      $addToSet: {
        comments: newComment,
      },
    }).exec((err, post) => {
      if (err) return next(err);
      if (!post) return next(404);
      new Notification({
        user: post.author,
        text: "You received a comment on your post",
        url: post._id,
      }).save((err, res) => {
        if (err) return next(err);
        io.to(post.author._id.toString()).emit("notification");
      });
      res.json(post);
    });
  },
];

exports.post_comment_update_put = [
  body("text", "Comment text can't be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    Comment.findOneAndUpdate(
      { _id: req.params.commentId, post: req.params.postId, author: req.user },
      { text: req.body.text },
      (err, comment) => {
        if (err) return next(err);
        if (!comment) return next(404);
        res.json(comment);
      }
    );
  },
];
exports.post_comment_delete = async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId)
    .populate("author")
    .exec();
  const post = await Post.findOne({
    _id: req.params.postId,
    comments: req.params.commentId,
  })
    .populate("author")
    .exec();
  if (
    comment.author._id.toString() !== req.user.id &&
    post.author._id.toString() !== req.user.id
  )
    return res.status(401).json("FORBIDDEN");
  Post.findOneAndUpdate(
    {
      _id: req.params.postId,
      comments: req.params.commentId,
    },
    {
      $pull: {
        comments: req.params.commentId,
      },
    },
    (err, post) => {
      if (err) return next(err);
      if (!post) return next(404);
      Comment.findOneAndDelete(
        {
          _id: req.params.commentId,
          author: req.user,
        },
        (error) => {
          if (error) return next(error);
          res.json("DELETED COMMENT SUCCESFULLY");
        }
      );
    }
  );
};

/* POST COMMENT LIKE OPERATIONS */

exports.post_comment_like_post = (req, res, next) => {
  Comment.findOneAndUpdate(
    {
      post: req.params.postId,
      _id: req.params.commentId,
    },
    {
      $addToSet: {
        likes: req.user,
      },
    },
    (err, comment) => {
      if (err) return next(err);
      if (!comment) return next(404);
      res.json(comment);
    }
  );
};

exports.post_comment_like_delete = (req, res, next) => {
  Comment.findByIdAndUpdate(
    {
      post: req.params.postId,
      _id: req.params.commentId,
    },
    {
      $pull: {
        likes: req.user._id,
      },
    },
    (err, comment) => {
      if (err) return next(err);
      if (!comment) return next(404);
      res.json(comment);
    }
  );
};
