const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const adminAuth = require('../middleware/adminAuth');

// Public: submit a new comment
router.post('/', async (req, res) => {
  try {
    const { name, role, message } = req.body;
    if (!name || !role || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const comment = new Comment({ name, role, message });
    await comment.save();
    res.status(201).json({ success: true, message: 'Comment submitted for review' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Public: get approved comments
router.get('/approved', async (req, res) => {
  try {
    const comments = await Comment.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: get all comments
router.get('/admin', adminAuth, async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: approve a comment
router.patch('/admin/:id/approve', adminAuth, async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: delete a comment
router.delete('/admin/:id', adminAuth, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
