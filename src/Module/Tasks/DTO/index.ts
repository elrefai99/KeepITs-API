import { IsNumber, IsObject, IsOptional, IsString } from "class-validator"

export class CreateTaskDto {
     @IsString()
     public title: string

     @IsString()
     public time: string

     @IsString()
     public endTime?: string

     @IsObject()
     @IsOptional()
     public dailyTimes?: Record<string, { time: string; endTime: string }>

     @IsNumber()
     @IsOptional()
     public durationDays?: number

     @IsString()
     public startDate: string

     @IsString()
     public endDate?: string

     @IsString()
     public description: string

     @IsString()
     @IsOptional()
     public date: string

     @IsString()
     @IsOptional()
     public meetingType?: 'none' | 'google' | 'teams' | 'custom'

     @IsString()
     @IsOptional()
     public meetingUrl?: string

     @IsString()
     @IsOptional()
     public guestEmails?: string[]
}
