import {
     IsString,
     IsNotEmpty,
     IsOptional,
     IsBoolean,
     IsNumber,
     IsArray,
     IsIn,
     IsEmail,
     Min,
} from "class-validator";

export class CreateTaskDTO {
     @IsString({ message: "Title is required" })
     @IsNotEmpty({ message: "Title is required" })
     public title: string;

     @IsString({ message: "Time is required" })
     @IsNotEmpty({ message: "Time is required" })
     public time: string;

     @IsString({ message: "End time must be a string" })
     @IsOptional()
     public endTime?: string;

     @IsString({ message: "Start date is required" })
     @IsNotEmpty({ message: "Start date is required" })
     public startDate: string;

     @IsString({ message: "End date must be a string" })
     @IsOptional()
     public endDate?: string;

     @IsString({ message: "Description is required" })
     @IsNotEmpty({ message: "Description is required" })
     public description: string;

     @IsString({ message: "Date is required" })
     @IsNotEmpty({ message: "Date is required" })
     public date: string;

     @IsNumber({}, { message: "Duration days must be a number" })
     @Min(1, { message: "Duration days must be at least 1" })
     @IsOptional()
     public durationDays?: number;

     @IsNumber({}, { message: "Order must be a number" })
     @IsOptional()
     public order?: number;

     @IsString({ message: "Meeting type must be a string" })
     @IsIn(["none", "google", "teams", "custom"], { message: "Meeting type must be none, google, teams, or custom" })
     @IsOptional()
     public meetingType?: "none" | "google" | "teams" | "custom";

     @IsString({ message: "Meeting URL must be a string" })
     @IsOptional()
     public meetingUrl?: string;

     @IsArray({ message: "Guest emails must be an array" })
     @IsEmail({}, { each: true, message: "Each guest email must be a valid email" })
     @IsOptional()
     public guestEmails?: string[];
}

export class UpdateTaskDTO {
     @IsString({ message: "Title must be a string" })
     @IsOptional()
     public title?: string;

     @IsString({ message: "Time must be a string" })
     @IsOptional()
     public time?: string;

     @IsString({ message: "End time must be a string" })
     @IsOptional()
     public endTime?: string;

     @IsString({ message: "Start date must be a string" })
     @IsOptional()
     public startDate?: string;

     @IsString({ message: "End date must be a string" })
     @IsOptional()
     public endDate?: string;

     @IsString({ message: "Description must be a string" })
     @IsOptional()
     public description?: string;

     @IsString({ message: "Date must be a string" })
     @IsOptional()
     public date?: string;

     @IsBoolean({ message: "Completed must be a boolean" })
     @IsOptional()
     public completed?: boolean;

     @IsNumber({}, { message: "Duration days must be a number" })
     @Min(1, { message: "Duration days must be at least 1" })
     @IsOptional()
     public durationDays?: number;

     @IsNumber({}, { message: "Order must be a number" })
     @IsOptional()
     public order?: number;

     @IsString({ message: "Meeting type must be a string" })
     @IsIn(["none", "google", "teams", "custom"], { message: "Meeting type must be none, google, teams, or custom" })
     @IsOptional()
     public meetingType?: "none" | "google" | "teams" | "custom";

     @IsString({ message: "Meeting URL must be a string" })
     @IsOptional()
     public meetingUrl?: string;

     @IsArray({ message: "Guest emails must be an array" })
     @IsEmail({}, { each: true, message: "Each guest email must be a valid email" })
     @IsOptional()
     public guestEmails?: string[];
}
