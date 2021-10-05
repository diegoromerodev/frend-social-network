const async = require("async");
const User = require("../../models/user");

/* USER FRIENDS ACTIONS */
exports.user_friends_get = (req, res, next) => {
  io.emit("message", "NEW MESSAGE");
  User.findById(req.params.userId)
    .populate("friends", "full_name profile_photo")
    .exec((err, user) => {
      if (err) return next(err);
      const { friends } = user.toObject();
      res.json(friends);
    });
};

exports.user_new_friend_post = [
  (req, res, next) => {
    if (req.user._id.toString() !== req.params.userId)
      return res.status(401).json("Unauthorized");
    async.series(
      {
        receiver: (callback) => {
          User.findByIdAndUpdate(
            req.params.userId,
            {
              $push: { friends: req.body.friendId },
              $pull: { received_requests: req.body.friendId },
            },
            { received_requests: req.body.friendId },
            callback
          );
        },
        sender: (callback) => {
          User.findByIdAndUpdate(
            req.body.friendId,
            {
              $push: { friends: req.params.userId },
              $pull: { sent_requests: req.params.userId },
            },
            { sent_requests: req.params.userId },
            callback
          );
        },
      },
      (err, results) => {
        if (err) return next(err);
        io.to(req.params.userId).emit("friend");
        io.to(req.body.friendId).emit("friend");
        if (results.sender && results.receiver)
          return res.json("BOTH FRIENDS UPDATED SUCCESSFULLY");
        return next(404);
      }
    );
  },
];

exports.user_friend_delete = (req, res, next) => {
  if (req.user._id.toString() !== req.params.userId)
    return res.status(401).json("Unauthorized");
  async.series(
    {
      main: (callback) => {
        User.findByIdAndUpdate(
          req.params.userId,
          {
            $pull: { friends: req.params.friendId },
          },
          callback
        );
      },
      unfriended: (callback) => {
        User.findByIdAndUpdate(
          req.params.friendId,
          {
            $pull: { friends: req.params.userId },
          },
          callback
        );
      },
    },
    (err) => {
      if (err) return next(err);
      io.to(req.params.userId).emit("friend");
      io.to(req.params.friendId).emit("friend");
      return res.json("BOTH UNFRIENDED SUCCESSFULLY");
    }
  );
};
