import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import { TaskModel } from "../../Tasks/Schema/tasks.schema";

/**
 * GET /api/v1/calendar/:date
 * Returns all tasks for a specific date (format: YYYY-MM-DD).
 */
export const dayController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { date } = req.params;

          const tasks = await TaskModel.find({
               userId: req.user._id,
               date,
          }).sort({ order: 1, time: 1 });

          res.status(200).json({
               code: 200,
               status: "OK",
               success: true,
               error: false,
               timestamp: new Date(),
               message: `Tasks for ${date} fetched successfully`,
               data: tasks,
          });
     }
);
