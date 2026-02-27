import { Document } from "mongoose";
export interface IUser extends Document {
     u_id: string
     email: string
     password: string
     name: string
     avatar: string
     last_login: string
     username: string
     status: EUserStatus

     comparePassword(candidatePassword: string): Promise<boolean>;
}
