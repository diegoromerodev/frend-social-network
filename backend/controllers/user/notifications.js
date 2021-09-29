const Notification = require("../../models/notification");

exports.user_notifications_get = (req, res, next) => {
  Notification.find({ user: req.user }).exec((err, notis) => {
    if (err) return next(err);
    res.json(notis);
  });
};

exports.user_notification_put = (req, res, next) => {
  Notification.findOneAndUpdate(
    { _id: req.params.notiId, user: req.user },
    { read: true },
    (err, noti) => {
      if (err) return next(err);
      return res.json(noti);
    }
  );
};

exports.user_notification_delete = (req, res, next) => {
  Notification.findOneAndDelete(
    { _id: req.params.notiId, user: req.user },
    (err) => {
      if (err) return next(err);
      return res.json("DELETED NOTIFICATION");
    }
  );
};
