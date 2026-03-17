import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import { BlogModel } from "../Schema/blog.schema";

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

          const blog = await BlogModel.create({
               title,
               content,
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
