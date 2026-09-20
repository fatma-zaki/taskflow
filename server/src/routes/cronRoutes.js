import express from 'express';
import { checkAndSendReminders, checkAndMarkOverdue } from '../services/cronService.js';
import { asyncHandler } from '../utils/errorHandler.js';
import { successResponse, errorResponse } from '../utils/responseWrapper.js';

const router = express.Router();

/**
 * Endpoints for scheduled work, called by Vercel Cron (see vercel.json).
 * Vercel sends `Authorization: Bearer $CRON_SECRET` when CRON_SECRET is set on the project,
 * so these stay closed to the public internet.
 */
const authorizeCron = (req, res, next) => {
  const secret = process.env.CRON_SECRET;

  if (!secret) {
    return errorResponse(res, 'CRON_SECRET is not configured', 503);
  }
  if (req.get('authorization') !== `Bearer ${secret}`) {
    return errorResponse(res, 'Not authorized', 401);
  }

  next();
};

router.use(authorizeCron);

router.get(
  '/reminders',
  asyncHandler(async (req, res) => {
    await checkAndSendReminders();
    successResponse(res, null, 'Reminder check completed');
  })
);

router.get(
  '/overdue',
  asyncHandler(async (req, res) => {
    await checkAndMarkOverdue();
    successResponse(res, null, 'Overdue check completed');
  })
);

export default router;
