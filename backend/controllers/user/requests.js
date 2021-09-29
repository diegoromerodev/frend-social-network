const User = require("../../models/user");

exports.user_requests_post = (req, res, next) => {
  User.findOne(
    {
      _id: req.user,
      $or: [
        { sent_requests: req.params.userId },
        { received_requests: req.params.userId },
      ],
    },
    (fail, dupe) => {
      if (dupe || req.params.userId === req.user._id.toString())
        return next(401);
      User.findByIdAndUpdate(
        req.params.userId,
        {
          $addToSet: {
            received_requests: req.user,
          },
        },
        (err) => {
          if (err) return next(err);
          User.findByIdAndUpdate(
            req.user,
            {
              $addToSet: {
                sent_requests: req.params.userId,
              },
            },
            (error) => {
              if (error) return next(error);
              return res.json("FRIEND REQUEST SENT");
            }
          );
        }
      );
    }
  );
};

/* FRIEND REJECTION MUST BE SENT WITH THE OPPOSITE'S USER ID
   AND REQ.BODY.SENDER TO DETERMINE IF CURR USER IS SENDER */
exports.user_requests_delete = (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.userId,
    {
      $pull: {
        [req.body.sender === "true" ? "received_requests" : "sent_requests"]:
          req.user._id,
      },
    },
    (err) => {
      if (err) return next(err);
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: {
            [req.body.sender === "true"
              ? "sent_requests"
              : "received_requests"]: req.params.userId,
          },
        },
        (error) => {
          if (error) return next(err);
          return res.json("FRIEND REQUEST REJECTED");
        }
      );
    }
  );
};
