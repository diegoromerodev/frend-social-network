const express = require("express");
const {
  user_chatrooms_all_get,
  user_chatroom_new_post,
  user_chatroom_one_get,
  user_chatroom_delete,
  user_chatroom_message_post,
  user_chatroom_message_delete,
} = require("../controllers/user/chatrooms");
const {
  user_friends_get,
  user_new_friend_post,
  user_friend_delete,
} = require("../controllers/user/friends");
const {
  user_notifications_get,
  user_notification_put,
  user_notification_delete,
} = require("../controllers/user/notifications");
const {
  user_posts_get,
  user_post_one_get,
  user_posts_new_post,
  user_posts_update_put,
  user_posts_delete,
} = require("../controllers/user/posts");
const {
  users_all_get,
  users_new_post,
  users_one_get,
  users_one_update,
  users_one_delete,
} = require("../controllers/user/registry");
const {
  user_requests_post,
  user_requests_delete,
} = require("../controllers/user/requests");

const router = express.Router();

/* USER FRIEND REQUESTS ACTIONS */
router.post("/:userId/requests", user_requests_post);

router.delete("/:userId/requests", user_requests_delete);

/* USER REGISTRY OPERATIONS */

router.get("/", users_all_get);

router.post("/", users_new_post);

router.get("/:userId", users_one_get);

router.put("/:userId", users_one_update);

router.delete("/:userId", users_one_delete);

/* USER POSTS ACTIONS */

router.get("/:userId/posts", user_posts_get);

router.get("/:userId/posts/:postId", user_post_one_get);

router.post("/:userId/posts/", user_posts_new_post);

router.put("/:userId/posts/:postId", user_posts_update_put);

router.delete("/:userId/posts/:postId", user_posts_delete);

/* USER FRIENDS ACTIONS */

router.get("/:userId/friends", user_friends_get);

router.post("/:userId/friends", user_new_friend_post);

router.delete("/:userId/friends/:friendId", user_friend_delete);

/* USER CHATROOM ACTIONS */

router.get("/:userId/chatrooms", user_chatrooms_all_get);

router.post("/:userId/chatrooms", user_chatroom_new_post);

router.get("/:userId/chatrooms/:chatId", user_chatroom_one_get);

router.delete("/:userId/chatrooms/:chatId", user_chatroom_delete);

/* USER CHAT MESSAGES ACTIONS */

router.post("/:userId/chatrooms/:chatId/messages", user_chatroom_message_post);

router.delete(
  "/:userId/chatrooms/:chatId/messages/:messageId",
  user_chatroom_message_delete
);

/* USER NOTIFICATION ACTIONS */

router.get("/:userId/notifications/", user_notifications_get);

router.put("/:userId/notifications/:notiId/", user_notification_put);

router.delete("/:userId/notifications/:notiId/", user_notification_delete);

module.exports.router = router;
