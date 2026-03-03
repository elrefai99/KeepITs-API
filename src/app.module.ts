import { Application } from "express";
import authModule from "./Module/authentication/auth.module";
import userModule from "./Module/user/user.module";

export default (app: Application) => {
     app.use("/api/v1/auth", authModule);
     app.use("/api/v1/user", userModule);
}
