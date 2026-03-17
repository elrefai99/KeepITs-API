import { Document, Types } from "mongoose";

export interface IBlog extends Document {
     uuid: string
     title: string
     content: string
     coverImage?: string         // Cloudinary URL
     coverImagePath?: string     // Cloudinary public_id (for deletion)
     contentImages?: string[]    // Cloudinary URLs for images embedded in content
     contentImagePaths?: string[] // Cloudinary public_ids (for deletion)
     userId: Types.ObjectId
     weekStart: string           // ISO date of the Monday of this blog's week (YYYY-MM-DD)
}
