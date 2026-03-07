import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { uploadImageToCloudinary } from "../functions/cloudinary";
import { UserModel } from "../Schema/User.schema";
import fs from "fs";

export const editController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { name } = req.body;

          const updates: any = {};
          if (name) {
               updates.name = name;
          }

          if (req.file) {
               const upload_cloudinary = await uploadImageToCloudinary(req.file.path, {
                    folder: "users_avatars",
                    publicId: `avatar_${req.user?._id || Date.now()}`,
               });

               updates.avatar = upload_cloudinary.url;
               if (fs.existsSync(req.file.path)) {
                    fs.unlinkSync(req.file.path);
               }
          }

          if (Object.keys(updates).length > 0) {
               const updatedUser = await UserModel.findByIdAndUpdate(req.user?._id, updates, { new: true });

               res.status(200).json({
                    code: 200,
                    status: "OK",
                    success: true,
                    error: false,
                    timestamp: new Date(),
                    message: "User profile updated successfully",
                    data: updatedUser
               });
               return;
          }

          res.status(200).json({
               code: 200,
               status: "OK",
               success: true,
               error: false,
               timestamp: new Date(),
               message: "No changes to update",
               data: req.user
          });
          return;
     }
);

