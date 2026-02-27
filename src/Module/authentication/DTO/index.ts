import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";

export class RegisterDTO {
     @IsString({ message: "Email is required" })
     @IsNotEmpty({ message: "Email is required" })
     public email: string;

     @IsString({ message: "Password is required" })
     @IsNotEmpty({ message: "Password is required" })
     @MinLength(8, { message: "Password must be at least 8 characters long" })
     @MaxLength(32, { message: "Password must be at most 32 characters long" })
     public password: string;

     @IsString({ message: "Name is required" })
     @IsNotEmpty({ message: "Name is required" })
     @MinLength(3, { message: "Name must be at least 3 characters long" })
     @MaxLength(32, { message: "Name must be at most 32 characters long" })
     public name: string;
}
