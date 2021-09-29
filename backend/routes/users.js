const express = require('express');
const { validate_token } = require('../controllers/auth');
const { chatroom_message_post } = require('../controllers/chatroom');
const { notification_post } = require('../controllers/notification');

const router = express.Router();

/* USER REGISTRY OPERATIONS */

router.get('/', validate_token);

router.post('/', (req, res, next) => {
  res.json('NOT IMPLEMENTED POST NEW USER');
});

router.get('/:userId', (req, res, next) => {
  res.json(`NOT IMPLEMENTED GET ONE USER ${req.params.userId}`);
});

router.put('/:userId', (req, res, next) => {
  res.json(`NOT IMPLEMENTED UPDATE ONE USER ${req.params.userId}`);
});

router.delete('/:userId', (req, res, next) => {
  res.json(`NOT IMPLEMENTED DELETE ONE USER ${req.params.userId}`);
});

/* USER POSTS ACTIONS */

router.get('/:userId/posts', (req, res, next) => {
  res.json(`NOT IMPLEMENTED GET ALL USER POSTS BY ${req.params.userId}`);
});

router.get('/:userId/posts/:postId', (req, res, next) => {
  res.json(`NOT IMPLEMENTED GET ONE POST BY USER ${req.params.userId}`);
});

router.post('/:userId/posts/:postId', (req, res, next) => {
  res.json(`NOT IMPLEMENTED POST NEW POST BY USER ${req.params.userId}`);
});

router.put('/:userId/posts/:postId', (req, res, next) => {
  res.json(`NOT IMPLEMENTED EDIT POST ${req.params.postId}`);
});

router.delete('/:userId/posts/:postId', (req, res, next) => {
  res.json(`NOT IMPLEMENTED DELETE POST BY USER ${req.params.userId}`);
});

/* USER FRIENDS ACTIONS */

router.get('/:userId/friends', (req, res, next) => {
  res.json(`NOT IMPLEMENTED GET ALL USER FRIENDS OF ${req.params.userId}`);
});

router.post('/:userId/friends', (req, res, next) => {
  res.json(`NOT IMPLEMENTED ADD NEW USER FRIEND OF ${req.params.userId}`);
});

router.delete('/:userId/friends/:friendId', (req, res, next) => {
  res.json(`NOT IMPLEMENTED UNFRIEND ONE USER FRIEND OF ${req.params.userId}`);
});

/* USER CHATROOM ACTIONS */

router.get('/:userId/chatrooms', (req, res, next) => {
  res.json(`NOT IMPLEMENTED GET ALL USER CHATROOMS FOR ${req.params.userId}`);
});

router.post('/:userId/chatrooms', (req, res, next) => {
  res.json(`NOT IMPLEMENTED ADD NEW USER CHATROOM FOR ${req.params.userId}`);
});

router.get('/:userId/chatrooms/:chatId', (req, res, next) => {
  res.json(`NOT IMPLEMENTED GET ONE USER CHATROOM ${req.params.chatId}`);
});

router.delete('/:userId/chatrooms/:chatId', (req, res, next) => {
  res.json(`NOT IMPLEMENTED DELETE ONE USER CHATROOM OF ${req.params.userId}`);
});

/* USER CHAT MESSAGES ACTIONS */

router.get('/:userId/chatrooms/:chatId/messages', (req, res, next) => {
  res.json(`NOT IMPLEMENTED GET ALL USER CHAT MESSAGES FROM CHAT ${req.params.chatId}`);
});

router.post('/:userId/chatrooms/:chatId/messages', chatroom_message_post);

router.delete('/:userId/chatrooms/:chatId/messages/:messageId', (req, res, next) => {
  res.json(`NOT IMPLEMENTED DELETE ONE USER CHAT MESSAGE FROM CHAT ${req.params.chatId}`);
});

/* USER NOTIFICATION ACTIONS */

router.get('/:userId/notifications/', (req, res, next) => {
  res.json(`NOT IMPLEMENTED GET ALL NOTIFICATIONS FOR USER ${req.params.userId}`);
});

router.post('/:userId/notifications/', notification_post);

router.put('/:userId/notifications/:notiId/', (req, res, next) => {
  res.json(`NOT IMPLEMENTED UPDATE USER NOTIFICATION ${req.params.notiId}`);
});

router.delete('/:userId/notifications/:notiId/', (req, res, next) => {
  res.json(`NOT IMPLEMENTED DELETE NOTIFICATION ${req.params.notiId}`);
});

module.exports = router;
