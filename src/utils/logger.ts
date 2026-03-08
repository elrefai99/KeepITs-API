import { createLogger, format, transports } from "winston";
import * as path from "path";

const { combine, timestamp, errors, json, printf } = format;
const accessFormat = printf(({ message }: any) => message);
const errorFormat = combine(timestamp(), errors({ stack: true }), json());

function getToday(): string {
     return new Date().toLocaleDateString("en-EG", {
          timeZone: "Africa/Cairo",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
     }).split("/").reverse().join("-");
}

export function logFilePath(type: "access" | "error", date?: string): string {
     const day = date ?? getToday();
     return path.resolve(`logs/${day}/${type}-${day}.log`);
}
export const logger = createLogger({
     level: "info",
     transports: [
          new transports.File({
               filename: logFilePath("error"),
               level: "error",
               format: errorFormat,
          }),
          new transports.File({
               filename: logFilePath("access"),
               format: accessFormat,
          }),
     ],
});

export function logEndpointError({ endpoint, error, meta = {}, }: any): void {
     logger.error({
          endpoint,
          message: error?.message ?? String(error),
          stack: error?.stack,
          ...meta,
     });
}
