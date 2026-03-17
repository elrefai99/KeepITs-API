import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import ServerError from "../../../Common/decorators/api-errors";
import { BlogModel } from "../Schema/blog.schema";
import { uploadImageToCloudinary } from "../../user/functions/cloudinary";
import { v2 as cloudinary } from "cloudinary";

async function deleteCloudinaryImage(publicId: string): Promise<void> {
     try {
          await cloudinary.uploader.destroy(publicId);
     } catch (_) {
          // Non-fatal: log and continue
     }
}

export const editBlogController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const { id } = req.params;
          const files = req.files as Record<string, Express.Multer.File[]> | undefined;

          const blog = await BlogModel.findOne({ uuid: id });
          if (!blog) return next(new ServerError("Blog not found", 404));

          if (blog.userId.toString() !== req.user._id.toString()) {
               return next(new ServerError("You are not allowed to edit this blog", 403));
          }

          const updates: Partial<{
               title: string;
               content: string;
               coverImage: string;
               coverImagePath: string;
               contentImages: string[];
               contentImagePaths: string[];
          }> = {};

          if (req.body.title)   updates.title   = req.body.title;
          if (req.body.content) updates.content = req.body.content;

          // Replace cover image
          if (files?.coverImage?.[0]) {
               if (blog.coverImagePath) await deleteCloudinaryImage(blog.coverImagePath);
               const result = await uploadImageToCloudinary(files.coverImage[0].buffer, {
                    folder: "keepits/blogs/covers",
                    tags: ["blog", "cover"],
               });
               updates.coverImage     = result.url;
               updates.coverImagePath = result.path;
          }

          // Replace all content images (delete old ones, upload new ones)
          if (files?.contentImages?.length) {
               if (blog.contentImagePaths?.length) {
                    await Promise.allSettled(
                         blog.contentImagePaths.map(p => deleteCloudinaryImage(p))
                    );
               }
               const newUrls: string[]  = [];
               const newPaths: string[] = [];
               for (const file of files.contentImages) {
                    const result = await uploadImageToCloudinary(file.buffer, {
                         folder: "keepits/blogs/content",
                         tags: ["blog", "content"],
                    });
                    newUrls.push(result.url);
                    newPaths.push(result.path);
               }
               updates.contentImages     = newUrls;
               updates.contentImagePaths = newPaths;
          }

          const updated = await BlogModel.findOneAndUpdate(
               { uuid: id },
               { $set: updates },
               { new: true }
          ).select("-coverImagePath -contentImagePaths");

          res.status(200).json({
               code: 200,
               status: "OK",
               success: true,
               error: false,
               timestamp: new Date(),
               message: "Blog updated successfully",
               data: updated,
          });
     }
);
