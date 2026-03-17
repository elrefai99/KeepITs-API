import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import ServerError from "../../../Common/decorators/api-errors";
import { BlogModel } from "../Schema/blog.schema";
import { v2 as cloudinary } from "cloudinary";

async function deleteCloudinaryImage(publicId: string): Promise<void> {
     try {
          await cloudinary.uploader.destroy(publicId);
     } catch (_) {
          // Non-fatal
     }
}

export const deleteBlogController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const { id } = req.params;

          const blog = await BlogModel.findOne({ uuid: id });
          if (!blog) return next(new ServerError("Blog not found", 404));

          if (blog.userId.toString() !== req.user._id.toString()) {
               return next(new ServerError("You are not allowed to delete this blog", 403));
          }

          // Clean up Cloudinary assets
          const cleanupTasks: Promise<void>[] = [];
          if (blog.coverImagePath)       cleanupTasks.push(deleteCloudinaryImage(blog.coverImagePath));
          if (blog.contentImagePaths?.length) {
               blog.contentImagePaths.forEach(p => cleanupTasks.push(deleteCloudinaryImage(p)));
          }
          await Promise.allSettled(cleanupTasks);

          await blog.deleteOne();

          res.status(200).json({
               code: 200,
               status: "OK",
               success: true,
               error: false,
               timestamp: new Date(),
               message: "Blog deleted successfully",
               data: null,
          });
     }
);
