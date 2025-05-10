const Resource = require('../models/resourceModel');


export const createResource = async (req, res) => {
    try {
      const resource = await Resource.create(req.body);
      res.status(201).json(resource);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // جلب الموارد مع فلترة
  export const getResources = async (req, res) => {
    const { type, search } = req.query;
    let filter = {};
  
    if (type) filter.type = type;
    if (search) filter.title = { $regex: search, $options: "i" };
  
    try {
      const resources = await Resource.find(filter).sort({ createdAt: -1 });
      res.json(resources);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };