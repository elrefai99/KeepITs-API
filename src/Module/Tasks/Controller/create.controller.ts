import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import { TaskModel } from "../Schema/tasks.schema";

export const createController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const {
               title, time, endTime, startDate, endDate,
               description, date, durationDays, order,
               meetingType, meetingUrl, guestEmails, dailyTimes,
          } = req.body;

          const task = await TaskModel.create({
               title,
               time,
               endTime,
               startDate,
               endDate,
               description,
               date,
               durationDays,
               order,
               meetingType: meetingType || "none",
               meetingUrl,
               guestEmails,
               dailyTimes,
               userId: req.user._id,
               completed: false,
          });

          res.status(201).json({
               code: 201,
               status: "Created",
               success: true,
               error: false,
               timestamp: new Date(),
               message: "Task created successfully",
               data: task,
          });
     }
);
