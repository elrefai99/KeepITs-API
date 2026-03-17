import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import { BlogModel } from "../Schema/blog.schema";
import { uploadImageToCloudinary } from "../../user/functions/cloudinary";

function getStartOfWeek(): string {
     const now = new Date();
     const day = now.getUTCDay();
     const diff = now.getUTCDate() - day + (day === 0 ? -6 : 1);
     const monday = new Date(now);
     monday.setUTCDate(diff);
     monday.setUTCHours(0, 0, 0, 0);
     return monday.toISOString().split("T")[0];
}

export const createBlogController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { title, content } = req.body;
          const files = req.files as Record<string, Express.Multer.File[]> | undefined;

          let coverImage: string | undefined;
          let coverImagePath: string | undefined;
          const contentImages: string[] = [];
          const contentImagePaths: string[] = [];

          // Upload cover image to Cloudinary
          if (files?.coverImage?.[0]) {
               const result = await uploadImageToCloudinary(files.coverImage[0].buffer, {
                    folder: "keepits/blogs/covers",
                    tags: ["blog", "cover"],
               });
               coverImage = result.url;
               coverImagePath = result.path;
          }

          // Upload inline content images to Cloudinary
          if (files?.contentImages?.length) {
               for (const file of files.contentImages) {
                    const result = await uploadImageToCloudinary(file.buffer, {
                         folder: "keepits/blogs/content",
                         tags: ["blog", "content"],
                    });
                    contentImages.push(result.url);
                    contentImagePaths.push(result.path);
               }
          }

          const blog = await BlogModel.create({
               title,
               content,
               coverImage,
               coverImagePath,
               contentImages,
               contentImagePaths,
               userId: req.user._id,
               weekStart: getStartOfWeek(),
          });

          res.status(201).json({
               code: 201,
               status: "Created",
               success: true,
               error: false,
               timestamp: new Date(),
               message: "Blog created successfully",
               data: blog,
          });
     }
);
