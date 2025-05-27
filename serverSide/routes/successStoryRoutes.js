import express from "express";
import {
  getSuccessStories,
  createSuccessStory,
  deleteSuccessStory,
} from "../controllers/successStoryController.js";

const router = express.Router();

router.get("/", getSuccessStories);
router.post("/", createSuccessStory);
router.delete("/:id", deleteSuccessStory);

export default router;