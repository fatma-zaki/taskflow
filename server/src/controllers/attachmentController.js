import Attachment from '../models/Attachment.js';
import Task from '../models/Task.js';
import { asyncHandler } from '../utils/errorHandler.js';
import { successResponse, errorResponse } from '../utils/responseWrapper.js';
import { saveUpload, readUpload, removeUpload } from '../services/storageService.js';

export const uploadAttachment = asyncHandler(async (req, res) => {
  if (!req.file) {
    return errorResponse(res, 'No file uploaded', 400);
  }

  const task = await Task.findById(req.params.id);

  if (!task) {
    return errorResponse(res, 'Task not found', 404);
  }

  // Check permissions
  if (
    req.user.role !== 'admin' &&
    task.assignee_id.toString() !== req.user._id.toString() &&
    task.reporter_id.toString() !== req.user._id.toString()
  ) {
    return errorResponse(res, 'Not authorized', 403);
  }

  const stored = await saveUpload(req.file);

  const attachment = await Attachment.create({
    task_id: req.params.id,
    filename: stored.key,
    originalname: req.file.originalname,
    path: stored.location,
    mimetype: req.file.mimetype,
    size: req.file.size,
    uploaded_by: req.user._id,
  });

  const populatedAttachment = await Attachment.findById(attachment._id)
    .populate('uploaded_by', 'name');

  successResponse(res, { attachment: populatedAttachment }, 'File uploaded successfully', 201);
});

export const getAttachments = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return errorResponse(res, 'Task not found', 404);
  }

  // Check permissions
  if (
    req.user.role !== 'admin' &&
    task.assignee_id.toString() !== req.user._id.toString() &&
    task.reporter_id.toString() !== req.user._id.toString()
  ) {
    return errorResponse(res, 'Not authorized', 403);
  }

  const attachments = await Attachment.find({ task_id: req.params.id })
    .populate('uploaded_by', 'name')
    .sort('-createdAt');

  successResponse(res, { attachments });
});

export const downloadAttachment = asyncHandler(async (req, res) => {
  const attachment = await Attachment.findById(req.params.attachmentId);

  if (!attachment) {
    return errorResponse(res, 'Attachment not found', 404);
  }

  const task = await Task.findById(attachment.task_id);

  // Check permissions
  if (
    req.user.role !== 'admin' &&
    task.assignee_id.toString() !== req.user._id.toString() &&
    task.reporter_id.toString() !== req.user._id.toString()
  ) {
    return errorResponse(res, 'Not authorized', 403);
  }

  let fileBuffer;
  try {
    fileBuffer = await readUpload(attachment);
  } catch (err) {
    console.error('Download error:', err);
    return errorResponse(res, 'Error downloading file', 500);
  }

  res.setHeader('Content-Type', attachment.mimetype || 'application/octet-stream');
  res.setHeader('Content-Length', fileBuffer.length);
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${encodeURIComponent(attachment.originalname)}"`
  );
  res.send(fileBuffer);
});

export const deleteAttachment = asyncHandler(async (req, res) => {
  const attachment = await Attachment.findById(req.params.attachmentId);

  if (!attachment) {
    return errorResponse(res, 'Attachment not found', 404);
  }

  const task = await Task.findById(attachment.task_id);

  // Check permissions - only admin, reporter, or uploader can delete
  if (
    req.user.role !== 'admin' &&
    task.reporter_id.toString() !== req.user._id.toString() &&
    attachment.uploaded_by.toString() !== req.user._id.toString()
  ) {
    return errorResponse(res, 'Not authorized', 403);
  }

  // Delete the stored file (Vercel Blob or local disk)
  await removeUpload(attachment);

  await Attachment.findByIdAndDelete(req.params.attachmentId);

  successResponse(res, null, 'Attachment deleted successfully');
});

