const Article = require("../models/Article");
const Event = require("../models/Event");
const Media = require("../models/Media");

// Articles Controllers
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  const article = req.body;
  const newArticle = new Article(article);

  try {
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Events Controllers
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Sort by date ascending
    res.status(200).json(events);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createEvent = async (req, res) => {
  const event = req.body;
  const newEvent = new Event(event);

  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Media Controllers
const getMedia = async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.status(200).json(media);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createMedia = async (req, res) => {
  const media = req.body;
  const newMedia = new Media(media);

  try {
    await newMedia.save();
    res.status(201).json(newMedia);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Export all controller functions
module.exports = {
  getArticles,
  createArticle,
  getEvents,
  createEvent,
  getMedia,
  createMedia,
};
