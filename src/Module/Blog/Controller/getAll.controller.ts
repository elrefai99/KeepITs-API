import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import { BlogModel } from "../Schema/blog.schema";

export const getAllBlogsController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const page  = Math.max(1, parseInt(req.query.page  as string) || 1);
          const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 10));
          const skip  = (page - 1) * limit;

          const [blogs, total] = await Promise.all([
               BlogModel.find()
                    .populate("userId", "name username avatar")
                    .select("-coverImagePath -contentImagePaths")
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),
               BlogModel.countDocuments(),
          ]);

          res.status(200).json({
               code: 200,
               status: "OK",
               success: true,
               error: false,
               timestamp: new Date(),
               message: "Blogs fetched successfully",
               data: {
                    blogs,
                    pagination: {
                         total,
                         page,
                         limit,
                         totalPages: Math.ceil(total / limit),
                    },
               },
          });
     }
);
