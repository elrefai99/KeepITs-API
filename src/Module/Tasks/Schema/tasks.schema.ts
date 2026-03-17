import { Schema, model } from "mongoose";
import { ITask } from "../@types";
import { v4 as uuidv4 } from "uuid";

const taskSchema = new Schema<ITask>({
     uuid: {
          type: String,
          default: () => uuidv4(),
          index: true,
     },
     title: {
          type: String,
          required: true,
          trim: true,
     },
     time: {
          type: String,
          required: true,
     },
     endTime: {
          type: String,
     },
     dailyTimes: {
          type: Schema.Types.Mixed,
     },
     durationDays: {
          type: Number,
     },
     startDate: {
          type: String,
          required: true,
     },
     endDate: {
          type: String,
     },
     description: {
          type: String,
          required: true,
     },
     completed: {
          type: Boolean,
          default: false,
     },
     date: {
          type: String,
          required: true,
          index: true,
     },
     userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
          index: true,
     },
     order: {
          type: Number,
     },
     meetingType: {
          type: String,
          enum: ["none", "google", "teams", "custom"],
          default: "none",
     },
     meetingUrl: {
          type: String,
     },
     guestEmails: [{ type: String }],
}, { timestamps: true });

export const TaskModel = model<ITask>("Task", taskSchema);
