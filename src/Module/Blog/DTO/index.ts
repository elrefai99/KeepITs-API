import { IsString, IsNotEmpty, MinLength } from "class-validator";

export class CreateBlogDTO {
     @IsString({ message: "Title is required" })
     @IsNotEmpty({ message: "Title is required" })
     @MinLength(3, { message: "Title must be at least 3 characters" })
     public title: string;

     @IsString({ message: "Content is required" })
     @IsNotEmpty({ message: "Content is required" })
     @MinLength(10, { message: "Content must be at least 10 characters" })
     public content: string;
}
