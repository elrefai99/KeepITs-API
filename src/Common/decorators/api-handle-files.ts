import { Request } from "express";
import multer from "multer";
import path from "path";

const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
          cb(null, true);
     } else {
          cb(null, false);
     }
}

const destination = (req: Request, _file: Express.Multer.File, cb: any) => {
     const baseReq = req.baseUrl;
     const isUser = baseReq.includes("user");

     const pathFile = path.join(__dirname, "../../../", "uploads", isUser ? "users" : "");
     cb(null, pathFile);
}


function filename(_req: Request, file: Express.Multer.File, callback: any) {
     callback(
          null,
          parseInt(
               Math.ceil(Math.random() * Date.now())
                    .toPrecision(16)
                    .toString()
                    .replace(".", "")
          ) + path.extname(file.originalname)
     );
}

const multerStorage = multer.diskStorage({
     destination: destination,
     filename: filename,
});

export const uploadAvatar: any = multer({
     storage: multerStorage,
     fileFilter: fileFilter,
     limits: {
          fileSize: 75 * 1024 * 1024,
     },
}).single("img")
