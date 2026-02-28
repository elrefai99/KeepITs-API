import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import { loginDTO } from "../DTO";
import { auth_service } from "../auth.service";
import { UserModel } from "../../user/Schema/User.schema";
import { token_PASETO } from "../Pipe/paseto.pipe";

export const loginController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
          const { email, password } = req.body as loginDTO;
          const authService = new auth_service(UserModel as typeof UserModel);

          const user = await authService.login({ email, password });

          const token = await token_PASETO({ data: { user_id: user.data._id } }, "access");
          const tokenRefresh = await token_PASETO({ data: { user_id: user.data._id } }, "refresh");

          res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 2 });
          res.cookie("refresh_token", tokenRefresh, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 30, });
          res.status(200).json({ code: 200, status: "OK", success: true, error: false, timestamp: new Date(), message: "User created successfully", data: token });
          return
     }
)
