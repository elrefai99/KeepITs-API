import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import { TaskModel } from "../Schema/tasks.schema";
import ServerError from "../../../Common/decorators/api-errors";

export const deleteController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const { id } = req.params;

          const task = await TaskModel.findOneAndDelete({ uuid: id, userId: req.user._id });
          if (!task) {
               return next(new ServerError("Task not found", 404));
          }

          res.status(200).json({
               code: 200,
               status: "OK",
               success: true,
               error: false,
               timestamp: new Date(),
               message: "Task deleted successfully",
               data: null,
          });
     }
);
