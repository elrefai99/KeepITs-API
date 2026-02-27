import "express";
import { IUserRequest } from "../../Common/Interface/user.interface";

declare global {
     namespace Express {
          export interface Request {
               user?: IUserRequest;
               lang?: string;
          }
     }
}

export { };
