///////////////ajlouni code was commented by Ali
// import express from "express";
// import {
//   getSuccessStories,
//   createSuccessStory,
//   deleteSuccessStory,
// } from "../controllers/successStoryController.js";

// const router = express.Router();

// router.get("/", getSuccessStories);
// router.post("/", createSuccessStory);
// router.delete("/:id", deleteSuccessStory);

// export default router;

const express = require("express");
const router = express.Router();
const {
  getSuccessStories,
  createSuccessStory,
  deleteSuccessStory,
} = require("../controllers/successStoryController.js");
router.get("/", getSuccessStories);
router.post("/", createSuccessStory);
router.delete("/:id", deleteSuccessStory);

module.exports = router;
