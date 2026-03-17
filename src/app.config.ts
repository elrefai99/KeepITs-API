import express, { Application } from "express";
import helmet from "helmet"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

export const coreAccessLinks: string[] = [
     process.env.SITE_URL_LOCALHOST as string,
     process.env.SITE_URL_Live as string
]

export default (app: Application) => {
     const corsOptions: object = {
          origin: (origin: any, callback: any) => {
               if (!origin || origin === "null" || coreAccessLinks.includes(origin)) {
                    callback(null, true);
               } else {
                    callback(new Error("Not allowed by CORS"));
               }
          },
          credentials: true,
          optionsSuccessState: 200,
     };
     app.use(
          helmet({
               contentSecurityPolicy: {
                    directives: {
                         defaultSrc: ["'self'"],
                         styleSrc: ["'self'", "'unsafe-inline'"],
                         scriptSrc: ["'self'"],
                         imgSrc: ["'self'", "data:", "https:"],
                         connectSrc: ["'self'", process.env.API_ENDPOINT_URL as string],
                    },
               },
               hsts: {
                    maxAge: 31536000, // 1 year
                    includeSubDomains: true,
                    preload: true,
               },
               referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
               permittedCrossDomainPolicies: { permittedPolicies: 'none' },
          })
     );
     app.use(
          express.json({
               limit: "75mb",
          })
     );
     app.use(
          express.urlencoded({
               extended: true,
          })
     );

     app.use("/v0/upload", express.static("uploads"));
     app.use(cors(corsOptions));
     app.use(cookieParser());
     app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
}
