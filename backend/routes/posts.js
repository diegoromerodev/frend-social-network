const express = require('express');

const router = express.Router();

/* POST BASIC OPERATIONS */

router.get('/', (req, res, next) => {
  res.json('NOT IMPLEMENTED GET ALL POSTS');
});

router.get('/:postId', (req, res, next) => {
  res.json(`NOT IMPLEMENTED GET ONE POST ${req.params.postId}`);
});

router.get('/', (req, res, next) => {
  res.json('NOT IMPLEMENTED GET ALL POSTS');
});

router.put('/:postId', (req, res, next) => {
  res.json(`NOT IMPLEMENTED UPDATE ONE POST ${req.params.postId}`);
});

router.delete('/:postId', (req, res, next) => {
  res.json(`NOT IMPLEMENTED DELETE ONE POST ${req.params.postId}`);
});

/* POST LIKES OPERATIONS */

router.get('/:postId/likes', (req, res, next) => {
  res.json(`GET ALL LIKES OF POST ${req.params.postId}`);
});

router.post('/:postId/likes', (req, res, next) => {
  res.json(`ADD NEW LIKE FOR POST ${req.params.postId}`);
});

router.delete('/:postId/likes/:likeId', (req, res, next) => {
  res.json(`REMOVE LIKE FOR POST ${req.params.postId}`);
});

/* POST COMMENT OPERATIONS */

router.get('/:postId/comments', (req, res, next) => {
  res.json(`GET ALL COMMENTS ON POST ${req.params.postId}`);
});

router.post('/:postId/comments', (req, res, next) => {
  res.json(`ADD NEW COMMENT ON POST ${req.params.postId}`);
});

router.put('/:postId/comments/:commentId', (req, res, next) => {
  res.json(`UPDATE COMMENT ON POST ${req.params.postId}`);
});

router.delete('/:postId/comments/:commentId', (req, res, next) => {
  res.json(`REMOVE COMMENT ON POST ${req.params.postId}`);
});

module.exports = router;
