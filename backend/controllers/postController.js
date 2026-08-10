const Post = require('../models/Post');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  try {
    const query = req.query.published === 'false' ? {} : { published: true };
    const posts = await Post.find(query).sort({ createdAt: -1 });
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get post by slug
// @route   GET /api/posts/:slug
// @access  Public
const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (post) {
      return res.json(post);
    } else {
      return res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    const createdPost = await post.save();
    return res.status(201).json(createdPost);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid post data', error: error.message });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (post) {
      return res.json(post);
    } else {
      return res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Invalid post data', error: error.message });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (post) {
      return res.json({ message: 'Post removed' });
    } else {
      return res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getPosts, getPostBySlug, createPost, updatePost, deletePost };
