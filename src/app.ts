import './core/dotenv.core'
import "reflect-metadata";
import { logger } from "./utils/logger";
process
     .on("unhandledRejection", (reason, promise) => {
          console.error(reason, "Unhandled Rejection at Promise", promise);
          logger.error({
               message: "Unhandled Rejection",
               reason: reason instanceof Error ? reason.message : reason,
               stack: reason instanceof Error ? reason.stack : undefined,
               promise
          });
     })
     .on("uncaughtException", (err) => {
          console.error(err, "\n Uncaught Exception thrown \n");
          logger.error({
               message: "Uncaught Exception",
               error: err.message,
               stack: err.stack
          });
          setTimeout(() => {
               process.exit(1);
          }, 500);
     });
import express, { Request, Response } from 'express'
import { mongoDBConnection } from './core/mongoDB.core';
import appConfig, { coreAccessLinks } from './app.config';
import appModule from './app.module';
import { kafka } from './core/kafka.core';
import { setupSwagger } from './swagger';
import * as http from 'http'
import { Server as SocketIOServer } from 'socket.io'
const app = express()

const server = http.createServer(app)
export let ioSocket: SocketIOServer;

ioSocket = new SocketIOServer(server, {
     cors: {
          origin: coreAccessLinks,
     },
})

appConfig(app)
appModule(app);
setupSwagger(app)


app.use(async (_req: Request, res: Response) => {
     res.status(404).send('This is not the API route you are looking for')
})

const main = async () => {
     try {
          const port: number = Number(process.env.PORT) || 9999
          await Promise.all([
               mongoDBConnection(),
               kafka,
          ]);
          server.listen(port, () => {
               console.log("🌐 Server is running on:", String(process.env.API_ENDPOINT_URL))
          });
     }
     catch (err) {
          console.error("❌ Failed to start server:", err);
          process.exit(1);
     }
}

main()
export default server;
