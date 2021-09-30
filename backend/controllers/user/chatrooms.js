const { body, validationResult } = require("express-validator");
const Chatroom = require("../../models/chatroom");
const Message = require("../../models/message");

exports.user_chatrooms_all_get = (req, res, next) => {
  Chatroom.find({ participants: req.user })
    .populate({
      path: "messages",
      populate: {
        path: "sender",
        select: "first_name last_name profile_photo",
      },
    })
    .populate({
      path: "messages",
      populate: {
        path: "recipient",
        select: "first_name last_name profile_photo",
      },
    })
    .exec((err, chats) => {
      if (err) next(err);
      res.json(chats);
    });
};

exports.user_chatroom_new_post = (req, res, next) => {
  new Chatroom({
    participants: [req.params.userId, req.user._id.toString()],
  }).save((err, chat) => {
    if (err) next(err);
    res.json(chat);
  });
};

exports.user_chatroom_one_get = (req, res, next) => {
  Chatroom.findOne({ _id: req.params.chatId, participants: req.user })
    .populate({
      path: "messages",
      populate: {
        path: "sender",
        select: "first_name last_name profile_photo",
      },
    })
    .populate({
      path: "messages",
      populate: {
        path: "recipient",
        select: "first_name last_name profile_photo",
      },
    })
    .exec((err, chat) => {
      if (err) return next(err);
      res.json(chat);
    });
};

exports.user_chatroom_delete = (req, res, next) => {
  Chatroom.find({ _id: req.params.chatId, participants: req.user }).deleteOne(
    (err) => {
      if (err) return next(err);
      res.json("CHAT WIPED OFF THE FACE OF THE EARTH");
    }
  );
};

exports.user_chatroom_message_post = [
  body("text", "Text can't be empty").trim().isLength({ min: 1 }).escape(),
  body("recipient", "Recipient is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    console.log("HERE");
    const newMsg = new Message({
      sender: req.user,
      recipient: req.body.recipient,
      text: req.body.text,
    });
    newMsg.save((err) => {
      if (err) return next(err);
    });
    Chatroom.findOneAndUpdate(
      {
        _id: req.params.chatId,
        participants: {
          $all: [req.user, req.body.recipient],
        },
      },
      {
        $push: {
          messages: newMsg,
        },
      }
    ).exec((err, chat) => {
      if (err) return next(err);
      if (!chat) return next(404);
      res.json(chat);
    });
  },
];

exports.user_chatroom_message_delete = (req, res, next) => {
  Chatroom.findOneAndUpdate(
    { _id: req.params.chatId, message: req.params.messageId },
    {
      $pull: {
        messages: req.params.messageId,
      },
    }
  ).exec((err, chat) => {
    if (err) return next(err);
    Message.findByIdAndDelete(req.params.chatId, (error) => {
      if (error) return next(err);
      res.json(chat);
    });
  });
};
