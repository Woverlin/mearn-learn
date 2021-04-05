const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const verifyToken = require("../middleware/auth");


// @route DELETE api/posts
//@desc Delete posts
//@access Private

router.delete("/:id", verifyToken, async (req, res) => {
    try {
      const postDeleteCondition = { _id: req.params.id, user: req.userId };
      const deletePost = await Post.findByIdAndDelete(postDeleteCondition);
      //User not authorised or post not found
      if (!deletePost)
        return res
          .status(401)
          .json({ success: false, message: "Post not found or user not authorised" });
      return res.json({ success: true, post: deletePost });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

// @route PUT api/posts
//@desc update posts
//@access Private

router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  if (!title) return res.status(400).json({ success: false, message: "Title is required" });
  try {
    let updatePost = {
      title,
      description: description || "",
      url: (url.startsWith("htps://") ? url : `https://${url}`) || "",
      status: status || "TO LEARN",
      user: req.userId,
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, { new: true });

    // User not authorised to update post or post not found
    if (!updatePost)
      return res
        .status(401)
        .json({ success: false, message: "Post not found or user not authorized" });
    return res.json({ message: "Excellent progress!", post: updatePost, success: true });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @route GET api/posts
//@desc Get posts
//@access Private

router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", ["username"]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @route POST api/posts
//@desc Create posts
//@access Private

router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // validation

  if (!title) return res.status(400).json({ success: false, message: "Title is required" });
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("htps://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });
    await newPost.save();
    res.json({ success: true, message: "Created Post successfully", post: newPost });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});



module.exports = router;
