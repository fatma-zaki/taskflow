import multer from 'multer';

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Upload problems are the caller's fault, not a server crash: answer 4xx with a readable reason
  if (err instanceof multer.MulterError) {
    statusCode = err.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
    if (err.code === 'LIMIT_FILE_SIZE') {
      const maxMb = Math.round((parseInt(process.env.UPLOAD_MAX_SIZE) || 10 * 1024 * 1024) / (1024 * 1024));
      message = `File is too large. The limit is ${maxMb} MB`;
    }
  }

  // `message` is what the client reads; `error` is kept for existing consumers
  res.status(statusCode).json({
    success: false,
    message,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
