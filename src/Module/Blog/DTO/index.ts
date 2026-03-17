import { IsString, IsNotEmpty, IsOptional, MinLength } from "class-validator";

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

export class UpdateBlogDTO {
     @IsOptional()
     @IsString()
     @MinLength(3, { message: "Title must be at least 3 characters" })
     public title?: string;

     @IsOptional()
     @IsString()
     @MinLength(10, { message: "Content must be at least 10 characters" })
     public content?: string;
}
