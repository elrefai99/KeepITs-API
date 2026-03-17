import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import { TaskModel } from "../../Tasks/Schema/tasks.schema";
import ServerError from "../../../Common/decorators/api-errors";

/**
 * GET /api/v1/calendar?year=2026&month=3
 * Returns tasks grouped by date for the given month.
 * Defaults to the current month if no query params provided.
 */
export const monthController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const now = new Date();
          const year = parseInt(req.query.year as string) || now.getFullYear();
          const month = parseInt(req.query.month as string) || now.getMonth() + 1;

          if (month < 1 || month > 12) {
               return next(new ServerError("Month must be between 1 and 12", 400));
          }

          const monthStr = String(month).padStart(2, "0");
          const prefix = `${year}-${monthStr}`;

          const tasks = await TaskModel.find({
               userId: req.user._id,
               date: { $regex: `^${prefix}` },
          }).sort({ date: 1, order: 1 });

          const grouped: Record<string, typeof tasks> = {};
          for (const task of tasks) {
               if (!grouped[task.date]) {
                    grouped[task.date] = [];
               }
               grouped[task.date].push(task);
          }

          res.status(200).json({
               code: 200,
               status: "OK",
               success: true,
               error: false,
               timestamp: new Date(),
               message: "Calendar data fetched successfully",
               data: grouped,
          });
     }
);
