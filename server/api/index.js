/**
 * Vercel serverless entry point.
 *
 * Every request is rewritten here by vercel.json, and the Express app handles routing as
 * usual. There is no app.listen: Vercel invokes this handler directly. The scheduled work
 * that node-cron runs locally is triggered by Vercel Cron hitting /api/cron/* instead.
 */
import connectDB from '../src/config/database.js';
import app from '../src/app.js';

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(503).json({
      success: false,
      message: 'Database unavailable',
    });
    return;
  }

  return app(req, res);
}
