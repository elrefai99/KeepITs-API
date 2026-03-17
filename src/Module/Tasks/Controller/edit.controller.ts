import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import { TaskModel } from "../Schema/tasks.schema";
import ServerError from "../../../Common/decorators/api-errors";

export const editController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const { id } = req.params;

          const task = await TaskModel.findOne({ uuid: id, userId: req.user._id });
          if (!task) {
               return next(new ServerError("Task not found", 404));
          }

          const {
               title, time, endTime, startDate, endDate,
               description, date, completed, durationDays,
               order, meetingType, meetingUrl, guestEmails, dailyTimes,
          } = req.body;

          const updates: Record<string, any> = {};
          if (title !== undefined) updates.title = title;
          if (time !== undefined) updates.time = time;
          if (endTime !== undefined) updates.endTime = endTime;
          if (startDate !== undefined) updates.startDate = startDate;
          if (endDate !== undefined) updates.endDate = endDate;
          if (description !== undefined) updates.description = description;
          if (date !== undefined) updates.date = date;
          if (completed !== undefined) updates.completed = completed;
          if (durationDays !== undefined) updates.durationDays = durationDays;
          if (order !== undefined) updates.order = order;
          if (meetingType !== undefined) updates.meetingType = meetingType;
          if (meetingUrl !== undefined) updates.meetingUrl = meetingUrl;
          if (guestEmails !== undefined) updates.guestEmails = guestEmails;
          if (dailyTimes !== undefined) updates.dailyTimes = dailyTimes;

          await task.updateOne({ $set: updates }, { new: true });

          res.status(200).json({
               code: 200,
               status: "OK",
               success: true,
               error: false,
               timestamp: new Date(),
               message: "Task updated successfully",
               data: null,
          });
     }
);
