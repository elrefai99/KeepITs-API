import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { ISubscription } from "../@types";
import { EBillingCycle, ESubscriptionStatus, EUserPlan } from "../../../Common/enum";

const subscriptionSchema = new Schema<ISubscription>({
     uuid: {
          type: String,
          default: () => uuidv4(),
          index: true,
     },
     userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
          index: true,
     },
     plan: {
          type: String,
          enum: EUserPlan,
          required: true,
     },
     billingCycle: {
          type: String,
          enum: EBillingCycle,
          required: true,
     },
     amount: {
          type: Number,
          required: true,
     },
     currency: {
          type: String,
          default: "EGP",
     },
     status: {
          type: String,
          enum: ESubscriptionStatus,
          default: ESubscriptionStatus.PENDING,
     },
     gatewayOrderId: {
          type: String,
     },
     gatewayTransactionId: {
          type: String,
     },
     startDate: {
          type: String,
          required: true,
     },
     endDate: {
          type: String,
          required: true,
     },
}, { timestamps: true });

export const SubscriptionModel = model<ISubscription>("Subscription", subscriptionSchema);
