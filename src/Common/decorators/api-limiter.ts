import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const limiter = rateLimit({
     windowMs: 5 * 60 * 1000,
     max: 350,
     standardHeaders: true,
     legacyHeaders: false,
     keyGenerator: (req: Request | any) => req.clientIP,
     handler: (_, res: Response) => {
          res.status(429).json({ code: 429, status: "Too Many Requests", message: "Too many requests from this IP, please try again after an 1 min", });
          return
     },
});
