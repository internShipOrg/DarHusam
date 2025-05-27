import SuccessStory from "../models/SuccessStorymodels.js";

// Get all stories
export const getSuccessStories = async (req, res) => {
  try {
    const stories = await SuccessStory.find();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new story
export const createSuccessStory = async (req, res) => {
  try {
    const { name, imageUrl, shortStory, videoUrl } = req.body;
    const newStory = new SuccessStory({ name, imageUrl, shortStory, videoUrl });
    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete story
export const deleteSuccessStory = async (req, res) => {
  try {
    const { id } = req.params;
    await SuccessStory.findByIdAndDelete(id);
    res.json({ message: "Success story deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
