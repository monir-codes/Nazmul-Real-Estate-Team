const express = require('express');
const router = express.Router();
const { getPosts, getPostBySlug, createPost, updatePost, deletePost } = require('../controllers/postController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .get(getPosts)
  .post(protect, admin, createPost);

router.route('/:id')
  .put(protect, admin, updatePost)
  .delete(protect, admin, deletePost);

router.get('/slug/:slug', getPostBySlug);

module.exports = router;
