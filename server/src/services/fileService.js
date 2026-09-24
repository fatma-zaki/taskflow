import multer from 'multer';
import path from 'path';
import { AppError } from '../utils/errorHandler.js';

// Files are held in memory, then handed to storageService (Vercel Blob or local disk).
// Nothing is written at import time: Vercel's filesystem is read-only, so creating an
// uploads folder here would crash the function on startup.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = process.env.UPLOAD_ALLOWED_TYPES?.split(',') || [
    'jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt'
  ];
  const ext = path.extname(file.originalname).slice(1).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new AppError(`File type .${ext} is not allowed. Allowed: ${allowedTypes.join(', ')}`, 400), false);
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.UPLOAD_MAX_SIZE) || 10 * 1024 * 1024, // 10MB default
  },
  fileFilter,
});

export { uploadDir, saveUpload, readUpload, removeUpload, storageMode } from './storageService.js';
