import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import { TaskModel } from "../Schema/tasks.schema";

export const getAllController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const tasks = await TaskModel.find({ userId: req.user._id }).sort({ date: 1, order: 1 });

          res.status(200).json({
               code: 200,
               status: "OK",
               success: true,
               error: false,
               timestamp: new Date(),
               message: "Tasks fetched successfully",
               data: tasks,
          });
     }
);
