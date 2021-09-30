const express = require("express");
const {
  posts_all_get,
  post_one_get,
  post_like_post,
  post_like_delete,
  post_comment_new_post,
  post_comment_update_put,
  post_comment_delete,
  post_comment_like_post,
  post_comment_like_delete,
} = require("../controllers/post");

const router = express.Router();

/* POST BASIC OPERATIONS */

router.get("/", posts_all_get);

router.get("/:postId", post_one_get);

/* POST LIKES OPERATIONS */

router.post("/:postId/likes", post_like_post);

router.delete("/:postId/likes/", post_like_delete);

/* POST COMMENT OPERATIONS */

router.post("/:postId/comments", post_comment_new_post);

router.put("/:postId/comments/:commentId", post_comment_update_put);

router.delete("/:postId/comments/:commentId", post_comment_delete);

/* POST COMMENT LIKE OPERATIONS */

router.post("/:postId/comments/:commentId/likes", post_comment_like_post);

router.delete("/:postId/comments/:commentId/likes", post_comment_like_delete);

module.exports = router;
