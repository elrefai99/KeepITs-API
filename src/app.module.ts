import { Application } from "express";
import authModule from "./Module/authentication/auth.module";
import userModule from "./Module/user/user.module";
import tasksModule from "./Module/Tasks/tasks.module";
import calendarModule from "./Module/Calendar/calendar.module";

export default (app: Application) => {
     app.use("/api/v1/auth", authModule);
     app.use("/api/v1/user", userModule);
     app.use("/api/v1/tasks", tasksModule);
     app.use("/api/v1/calendar", calendarModule);
}
