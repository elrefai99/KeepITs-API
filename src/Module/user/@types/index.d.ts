import { Document } from "mongoose";
import { EUserPlan } from "../../../Common/enum";

export interface IUser extends Document {
     u_id: string
     email: string
     password: string
     name: string
     avatar: string
     last_login: string
     username: string
     status: EUserStatus
     plan: EUserPlan
     planExpiry?: string

     comparePassword(candidatePassword: string): Promise<boolean>;
}
export interface UploadImageResult {
     url: string;
     path: string;
};

export interface UploadImageOptions {
     folder: string;
     publicId?: string;
     overwrite?: boolean;
     tags?: string[];
};
