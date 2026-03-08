import { Document, Types } from "mongoose"

export interface ITask extends Document {
     uuid: string
     title: string
     time: string
     endTime?: string
     dailyTimes?: Record<string, { time: string; endTime: string }>
     durationDays?: number
     startDate: string
     endDate?: string
     description: string
     completed: boolean
     date: string
     userId: Types.ObjectId
     order?: number
     meetingType?: 'none' | 'google' | 'teams' | 'custom'
     meetingUrl?: string
     guestEmails?: string[]
}
