const express = require("express");
const { body, validationResult } = require("express-validator");
const Post = require("../models/Post");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({ total: posts.length, posts });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post(
  "/",
  auth,
  upload.single("image"),
  body("title").notEmpty(),
  body("content").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const newPost = new Post({
      ...req.body,
      image: req.file ? "/uploads/" + req.file.filename : null,
      user: req.user.id,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  }
);

router.put("/:id", auth, upload.single("image"), async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  if (post.user.toString() !== req.user.id) {
    return res.status(403).json({ error: "Not authorized" });
  }

  const updatedData = req.body;
  if (req.file) updatedData.image = "/uploads/" + req.file.filename;

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
  });

  res.json(updatedPost);
});

router.delete("/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  if (post.user.toString() !== req.user.id) {
    return res.status(403).json({ error: "Not authorized" });
  }

  await post.deleteOne();
  res.status(204).end();
});

module.exports = router;
