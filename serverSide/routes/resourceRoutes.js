const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = 'uploads/resources';
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    // Create a unique file name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Filter files based on type
const fileFilter = (req, file, cb) => {
  // Define allowed file types based on category
  let allowedTypes;
  
  switch (req.body.category) {
    case 'pdf':
      allowedTypes = ['application/pdf'];
      break;
    case 'videos':
      allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
      break;
    case 'presentations':
      allowedTypes = [
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/pdf'
      ];
      break;
    case 'articles':
      allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      break;
    default:
      allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'video/mp4',
        'video/webm',
        'image/jpeg',
        'image/png',
        'application/zip',
        'application/x-zip-compressed'
      ];
  }
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);  // Accept file
  } else {
    cb(new Error(`نوع الملف غير مسموح به. الأنواع المسموح بها: ${allowedTypes.join(', ')}`), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

// Public routes (no authentication required)
router.get('/', resourceController.getAllResources);
router.get('/:id', resourceController.getResource);
router.get('/:id/download', resourceController.downloadResource);

// Protected routes (authentication required)


// Admin-only routes

router.post('/', upload.single('file'), resourceController.createResource);
router.patch('/:id', upload.single('file'), resourceController.updateResource);
router.delete('/:id', resourceController.deleteResource);

module.exports = router;

