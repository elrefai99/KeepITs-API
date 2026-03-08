import { Document } from "mongoose";
export interface IUser extends Document {
     u_id: string
     email: string
     password: string
     name: string
     role: EUserRole
     avatar: string
     last_login: string
     username: string
     status: EUserStatus

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
