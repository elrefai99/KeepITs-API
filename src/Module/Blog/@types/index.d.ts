import { Document, Types } from "mongoose";

export interface IBlog extends Document {
     uuid: string
     title: string
     content: string
     userId: Types.ObjectId
     weekStart: string  // ISO date of Monday of the week (YYYY-MM-DD)
}
