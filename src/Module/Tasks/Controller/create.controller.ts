import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { CreateTaskDto } from "../DTO";
import { TasksModel } from "../Schema/tasks.schema";

export const createController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { title, time, endTime, dailyTimes, durationDays, startDate, endDate, description, date, meetingType, meetingUrl, guestEmails } = req.body as CreateTaskDto
          const task = await TasksModel.create({
               title,
               time,
               endTime,
               dailyTimes,
               durationDays,
               startDate: new Date(startDate).toISOString(),
               endDate: new Date(endDate).toISOString(),
               description,
               date: new Date(date).toISOString(),
               meetingType,
               meetingUrl,
               guestEmails,
               userId: req.user._id
          })
          res.status(201).json({ code: 201, status: "Created", success: true, error: false, timestamp: new Date(), message: "Task created successfully", data: task })
     }
)
