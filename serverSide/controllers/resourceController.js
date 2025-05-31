const Resource = require('../models/Resource');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const statAsync = promisify(fs.stat);
const existsAsync = promisify(fs.exists);

exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find({ $or: [ { isDeleted: false }, { isDeleted: { $exists: false } } ] }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: resources
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
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

exports.addResource = async (req, res) => {
  try {
    const { title, description, category, tags, isDownloadable } = req.body;
    let fileUrl = '';
    let thumbnailUrl = req.body.thumbnailUrl || '';

    // Handle file upload
    if (req.files && req.files.file) {
      const file = req.files.file[0];
      fileUrl = `/uploads/${file.filename}`;
    }

    // Handle thumbnail upload
    if (req.files && req.files.thumbnail) {
      const thumbnail = req.files.thumbnail[0];
      thumbnailUrl = `/uploads/${thumbnail.filename}`;
    }

    const resource = await Resource.create({
      title,
      description,
      category,
      fileUrl,
      thumbnailUrl,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      isDownloadable: isDownloadable === 'true'
    });

    res.status(201).json({
      success: true,
      data: resource
    });
  } catch (error) {
    // Clean up uploaded files if resource creation fails
    if (req.files) {
      Object.values(req.files).forEach(files => {
        files.forEach(file => {
          fs.unlink(file.path, err => {
            if (err) console.error('Error deleting file:', err);
          });
        });
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
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
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }
    resource.isDeleted = true;
    await resource.save();
    res.status(200).json({
      success: true,
      message: 'Resource soft deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.downloadResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    if (!resource.isDownloadable) {
      return res.status(403).json({
        success: false,
        message: 'This resource is not downloadable'
      });
    }

    const filePath = path.join(__dirname, '..', resource.fileUrl);
    if (!await existsAsync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    const stats = await statAsync(filePath);
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${resource.title}${path.extname(resource.fileUrl)}"`);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};