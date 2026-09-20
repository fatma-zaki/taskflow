import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from './utils/errorHandler.js';
import { securityHeaders } from './middleware/security.js';
import { requestLogger, errorLogger } from './middleware/logger.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import userRoutes from './routes/userRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import exportRoutes from './routes/exportRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import cronRoutes from './routes/cronRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security headers
app.use(securityHeaders);

// Request logging
if (process.env.NODE_ENV !== 'test') {
  app.use(requestLogger);
}

// Middleware
// FRONTEND_URL may hold several comma-separated origins (e.g. production plus a preview URL).
// Entries may use * as a wildcard, e.g. https://*.vercel.app
const stripTrailingSlash = (value) => value.replace(/\/+$/, '');

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => stripTrailingSlash(origin.trim()))
  .filter(Boolean);

const isAllowedOrigin = (origin) =>
  allowedOrigins.some((allowed) => {
    if (allowed === origin) return true;
    if (!allowed.includes('*')) return false;

    const pattern = allowed
      .split('*')
      .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('.*');
    return new RegExp(`^${pattern}$`).test(origin);
  });

app.use(cors({
  origin: (origin, callback) => {
    // Requests without an Origin header (curl, server-to-server, Vercel Cron) are allowed
    if (!origin || isAllowedOrigin(stripTrailingSlash(origin))) {
      return callback(null, true);
    }

    // Answer without CORS headers rather than throwing: throwing here turns every
    // cross-origin request into a 500 (and leaks a stack trace), which hides the real cause.
    console.warn(
      `CORS: blocked origin ${origin}. Allowed: ${allowedOrigins.join(', ')}. Set FRONTEND_URL to fix.`
    );
    return callback(null, false);
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/cron', cronRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Error logging
app.use(errorLogger);

// Error handler
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;

