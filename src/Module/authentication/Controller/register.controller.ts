import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import { RegisterDTO } from "../DTO";
import { auth_service } from "../auth.service";
import { UserModel } from "../../user/Schema/User.schema";

export const registerController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
          const { email, password, name } = req.body as RegisterDTO;
          const authService = new auth_service(UserModel as typeof UserModel);
          const userExists = await authService.check_user_exists(email);
          if (userExists) {
               res.status(400).json({ code: 400, status: "Bad Request", success: false, error: true, timestamp: new Date(), message: "User already exists" });
               return
          }
          const user = await authService.register({ email, password, name });
          res.status(201).json({ code: 201, status: "Created", success: true, error: false, timestamp: new Date(), message: "User created successfully", data: user });
          return
     }
)
