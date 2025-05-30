const Resource = require('../models/resourceModel');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const statAsync = promisify(fs.stat);
const existsAsync = promisify(fs.exists);

exports.getAllResources = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const skip = (page - 1) * limit;

    let query = { status: 'published' };

    if (req.query.category && req.query.category !== 'all') {
      query.category = req.query.category;
    }

    if (req.query.tag) {
      query.tags = req.query.tag;
    }

    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    const resources = await Resource.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Resource.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: resources.length,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      total,
      data: resources
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'لم يتم العثور على المورد المطلوب' });
    }

    await resource.incrementViewCount();

    res.status(200).json({ status: 'success', data: resource });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.createResource = async (req, res) => {
  try {
    if (req.file) {
      req.body.fileUrl = `/api/resources/files/${req.file.filename}`;
      req.body.filePath = req.file.path;
      req.body.fileSize = req.file.size;
      req.body.isDownloadable = true;
    } else if (req.body.externalUrl) {
      req.body.isDownloadable = false;
    } else {
      return res.status(400).json({ message: 'يجب تحميل ملف أو تقديم رابط خارجي' });
    }

    if (req.body.tags && typeof req.body.tags === 'string') {
      req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
    }

    const newResource = await Resource.create(req.body);

    res.status(201).json({ status: 'success', data: newResource });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.updateResource = async (req, res) => {
  try {
    if (req.file) {
      req.body.fileUrl = `/api/resources/files/${req.file.filename}`;
      req.body.filePath = req.file.path;
      req.body.fileSize = req.file.size;
      req.body.isDownloadable = true;
    }

    if (req.body.tags && typeof req.body.tags === 'string') {
      req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
    }

    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!resource) {
      return res.status(404).json({ message: 'لم يتم العثور على المورد المطلوب' });
    }

    res.status(200).json({ status: 'success', data: resource });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'لم يتم العثور على المورد المطلوب' });
    }

    if (resource.filePath) {
      const fileExists = await existsAsync(resource.filePath);
      if (fileExists) {
        fs.unlink(resource.filePath, err => {
          if (err) console.error(`Error deleting file: ${err.message}`);
        });
      }
    }

    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.downloadResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'لم يتم العثور على المورد المطلوب' });
    }

    if (!resource.isDownloadable || !resource.filePath) {
      return res.status(400).json({ message: 'هذا المورد غير متاح للتحميل' });
    }

    const fileExists = await existsAsync(resource.filePath);
    if (!fileExists) {
      return res.status(404).json({ message: 'الملف غير موجود' });
    }

    const stats = await statAsync(resource.filePath);
    const filename = path.basename(resource.filePath);

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', stats.size);

    await resource.incrementDownloadCount();

    const fileStream = fs.createReadStream(resource.filePath);
    fileStream.pipe(res);
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};