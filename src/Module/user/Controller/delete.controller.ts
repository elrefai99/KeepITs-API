import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserModel } from "../Schema/User.schema";
import { EUserStatus } from "../../../Common/enum";

export const deleteController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const cUser = await UserModel.findOne({ _id: req.user?._id, status: EUserStatus.ACTIVE });
          if (!cUser) {
               return res.status(404).json({
                    code: 404,
                    status: "NOT_FOUND",
                    success: false,
                    error: true,
                    timestamp: new Date(),
                    message: "User not found",
                    data: null
               });
          }
          await cUser.updateOne({
               $set: {
                    status: EUserStatus.DELETED
               }
          }, {
               new: true
          });

          res.status(200).json({
               code: 200,
               status: "OK",
               success: true,
               error: false,
               timestamp: new Date(),
               message: "User deleted successfully",
               data: null
          });
          return;
     }
)
