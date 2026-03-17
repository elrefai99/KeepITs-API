import { IsString, IsNotEmpty, IsIn } from "class-validator";
import { EBillingCycle, EUserPlan } from "../../../Common/enum";

export class InitiatePaymentDTO {
     @IsString({ message: "Plan is required" })
     @IsNotEmpty({ message: "Plan is required" })
     @IsIn([EUserPlan.GO, EUserPlan.PRO, EUserPlan.PLUS], { message: "Plan must be GO, PRO, or PLUS" })
     public plan: EUserPlan;

     @IsString({ message: "Billing cycle is required" })
     @IsNotEmpty({ message: "Billing cycle is required" })
     @IsIn([EBillingCycle.MONTHLY, EBillingCycle.YEARLY], { message: "Billing cycle must be MONTHLY or YEARLY" })
     public billingCycle: EBillingCycle;
}
