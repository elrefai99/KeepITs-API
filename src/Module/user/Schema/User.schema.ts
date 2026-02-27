import { Schema, model } from "mongoose";
import { IUser } from "../@types";
import { EUserStatus } from "../../../Common/enum";
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs";

const userSchema = new Schema<IUser>({
     u_id: {
          type: String,
          default: uuidv4(),
          index: true,
     },
     email: {
          type: String,
          trim: true,
          lowercase: true,
          required: true,
          index: true,
     },
     password: {
          type: String,
          required: true,
     },
     name: {
          type: String,
          required: true,
     },
     avatar: {
          type: String,
     },
     last_login: {
          type: String,
     },
     username: {
          type: String,
          required: true,
          trim: true,
          index: true,
          toLowerCase: true,
     },
     status: {
          type: String,
          enum: EUserStatus,
          default: EUserStatus.INACTIVE
     },
}, {
     timestamps: true,
})
userSchema.pre("save", async function (next: any) {
     // Only hash if password was modified (or is new)
     if (!this.isModified("password")) return next();

     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);

     next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
     return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = model<IUser>("User", userSchema);
