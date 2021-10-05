const async = require("async");

const User = require("../models/user");
const Post = require("../models/post");

exports.search_get = (req, res, next) => {
  async.parallel(
    {
      users: (callback) =>
        User.find({
          $or: [
            { first_name: { $regex: req.params.searchParam, $options: "i" } },
            { last_name: { $regex: req.params.searchParam, $options: "i" } },
          ],
        }).exec(callback),
      posts: (callback) =>
        Post.find({
          text: { $regex: req.params.searchParam, $options: "i" },
        })
          .populate("author")
          .limit(10)
          .exec(callback),
    },
    (err, results) => {
      if (err) return next(err);
      res.json(results);
    }
  );
};
