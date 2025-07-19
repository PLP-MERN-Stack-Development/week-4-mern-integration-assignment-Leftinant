const express = require("express");
const Comment = require("../models/Comment");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/:postId", async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId }).populate(
    "author"
  );
  res.json(comments);
});

router.post("/:postId", auth, async (req, res) => {
  const comment = new Comment({
    postId: req.params.postId,
    author: req.user.id,
    text: req.body.text,
  });
  const saved = await comment.save();
  res.status(201).json(saved);
});

module.exports = router;
