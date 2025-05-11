const express = require("express");
const {
  getArticles,
  createArticle,
  getEvents,
  createEvent,
  getMedia,
  createMedia,
} = require("../controllers/newsController.js");

const router = express.Router();

// Articles routes
router.get("/articles", getArticles);
router.post("/articles", createArticle);

// Events routes
router.get("/events", getEvents);
router.post("/events", createEvent);

// Media routes
router.get("/media", getMedia);
router.post("/media", createMedia);

module.exports = router;
