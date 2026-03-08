import { Schema, model } from "mongoose";
import { IUser } from "../@types";
import { EUserRole, EUserStatus } from "../../../Common/enum";
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
     role: {
          type: String,
          enum: EUserRole,
          default: EUserRole.USER
     },
     username: {
          type: String,
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
userSchema.pre("save", async function () {
     // Hash password only if modified
     if (this.isModified("password")) {
          const salt = await bcrypt.genSalt(10);
          this.password = await bcrypt.hash(this.password, salt);
     }

     // Generate username only on new document
     if (this.isNew) {
          const base = this.name
               .toLowerCase()
               .trim()
               .split(" ")
               .join("-")
               .split("@")[0];

          const unique = uuidv4().split("-")[0]; // e.g. "a1b2c3d4"
          this.username = `${base}-${unique}`;  // e.g. "john-doe-a1b2c3d4"
     }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
     return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = model<IUser>("User", userSchema);
