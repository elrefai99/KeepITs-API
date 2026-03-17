import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IBlog } from "../@types";

const blogSchema = new Schema<IBlog>({
     uuid: {
          type: String,
          default: () => uuidv4(),
          index: true,
     },
     title: {
          type: String,
          required: true,
          trim: true,
     },
     content: {
          type: String,
          required: true,
     },
     coverImage: {
          type: String,
     },
     coverImagePath: {
          type: String,
     },
     contentImages: [{ type: String }],
     contentImagePaths: [{ type: String }],
     userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
          index: true,
     },
     weekStart: {
          type: String,
          required: true,
          index: true,
     },
}, { timestamps: true });

export const BlogModel = model<IBlog>("Blog", blogSchema);
