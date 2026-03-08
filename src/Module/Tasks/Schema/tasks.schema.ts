import { model, Schema } from "mongoose";
import { ITask } from "../@types";
import { ETaskMeetingType } from "../../../Common/enum";
import { v4 as uuidv4 } from "uuid";

const tasks_Schema = new Schema<ITask>({
     uuid: {
          type: String,
          unique: true,
          index: true,
          trim: true,
          default: () => uuidv4().toLowerCase()
     },
     userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          index: true
     },
     title: {
          type: String,
          trim: true,
          default: ""
     },
     time: {
          type: String,
          trim: true,
          default: ""
     },
     endTime: {
          type: String,
          trim: true,
          default: ""
     },
     dailyTimes: {
          type: Object,
          default: {}
     },
     durationDays: {
          type: Number,
          default: 1
     },
     startDate: {
          type: String,
          default: ""
     },
     endDate: {
          type: String,
          default: ""
     },
     description: {
          type: String,
          default: ""
     },
     completed: {
          type: Boolean,
          default: false
     },
     date: {
          type: String,
          default: ""
     },
     meetingType: {
          type: String,
          enum: ETaskMeetingType,
          default: ETaskMeetingType.NONE
     },
     meetingUrl: {
          type: String,
          default: ""
     },
}, {
     timestamps: true
})

export const TasksModel = model<ITask>("Task", tasks_Schema)
