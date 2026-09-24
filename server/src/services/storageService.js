/**
 * File storage for task attachments.
 *
 * Two modes, picked automatically:
 *   - "blob": Vercel Blob, used when BLOB_READ_WRITE_TOKEN is set (required on Vercel,
 *     whose filesystem is read-only apart from /tmp, which is wiped between requests).
 *   - "disk": local uploads/tasks folder, used for local development.
 *
 * Note: Vercel Blob objects are served from public, unguessable URLs. The API still checks
 * permissions before returning a file, but anyone holding the raw blob URL can read it.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { AppError } from '../utils/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadDir = path.join(__dirname, '../../uploads/tasks');

export const storageMode = process.env.BLOB_READ_WRITE_TOKEN ? 'blob' : 'disk';

const uniqueName = (originalname) =>
  `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(originalname)}`;

/**
 * Persist an uploaded file (multer memory storage).
 * Returns { key, location } — `key` identifies the file for later reads/deletes,
 * `location` is the blob URL or the absolute path on disk.
 */
export const saveUpload = async (file) => {
  const name = uniqueName(file.originalname);

  if (storageMode === 'blob') {
    const { put } = await import('@vercel/blob');
    const blob = await put(`tasks/${name}`, file.buffer, {
      access: 'public',
      contentType: file.mimetype,
      addRandomSuffix: false,
    });
    return { key: blob.pathname, location: blob.url };
  }

  // Vercel sets VERCEL=1. Its disk is read-only, so without a Blob store the write below
  // would fail with an opaque EROFS error.
  if (process.env.VERCEL) {
    throw new AppError(
      'File storage is not configured on the server. Connect a Vercel Blob store to the API project (it sets BLOB_READ_WRITE_TOKEN) and redeploy.',
      503
    );
  }

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const filePath = path.join(uploadDir, name);
  await fs.promises.writeFile(filePath, file.buffer);
  return { key: name, location: filePath };
};

/** Read a stored file back as a Buffer. */
export const readUpload = async (attachment) => {
  if (storageMode === 'blob' || /^https?:\/\//.test(attachment.path)) {
    const response = await fetch(attachment.path);
    if (!response.ok) {
      throw new Error(`Blob download failed with status ${response.status}`);
    }
    return Buffer.from(await response.arrayBuffer());
  }

  return fs.promises.readFile(path.join(uploadDir, attachment.filename));
};

/** Remove a stored file. Never throws — deleting the database row matters more. */
export const removeUpload = async (attachment) => {
  try {
    if (storageMode === 'blob' || /^https?:\/\//.test(attachment.path)) {
      const { del } = await import('@vercel/blob');
      await del(attachment.path);
      return true;
    }

    const filePath = path.join(uploadDir, attachment.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting stored file:', error);
    return false;
  }
};
