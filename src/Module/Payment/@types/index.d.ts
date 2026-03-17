import { Document, Types } from "mongoose";
import { EBillingCycle, ESubscriptionStatus, EUserPlan } from "../../../Common/enum";

export interface ISubscription extends Document {
     uuid: string
     userId: Types.ObjectId
     plan: EUserPlan
     billingCycle: EBillingCycle
     amount: number
     currency: string
     status: ESubscriptionStatus
     gatewayOrderId?: string
     gatewayTransactionId?: string
     startDate: string
     endDate: string
}
