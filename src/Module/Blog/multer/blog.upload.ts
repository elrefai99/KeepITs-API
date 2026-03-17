import multer from "multer";
import { Request } from "express";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
     if (ALLOWED_TYPES.includes(file.mimetype)) {
          cb(null, true);
     } else {
          cb(null, false);
     }
};

/**
 * Blog image upload:
 * - coverImage   : single main image
 * - contentImages: up to 10 inline images embedded in the blog body
 */
export const blogUpload = multer({
     storage: multer.memoryStorage(),
     fileFilter,
     limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
}).fields([
     { name: "coverImage",    maxCount: 1  },
     { name: "contentImages", maxCount: 10 },
]);
