import { Application } from "express";
import authModule from "./Module/authentication/auth.module";

export default (app: Application) => {
     app.use("/api/v1/auth", authModule);
}
