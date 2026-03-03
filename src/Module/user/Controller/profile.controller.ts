import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../Common/decorators/api-requesthandler";

export const profileController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {

          res.status(200).json({
               code: 200,
               status: "OK",
               success: true,
               error: false,
               timestamp: new Date(),
               message: "Profile fetched successfully",
               data: req.user
          })
          return
     }
)
