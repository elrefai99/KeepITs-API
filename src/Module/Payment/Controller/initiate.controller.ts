import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import ServerError from "../../../Common/decorators/api-errors";
import { EBillingCycle, ESubscriptionStatus, EUserPlan } from "../../../Common/enum";
import { PLAN_PRICING } from "../../../Common/config/plans.config";
import { SubscriptionModel } from "../Schema/subscription.schema";
import { gatewayProvider } from "../providers";
import { v4 as uuidv4 } from "uuid";
import { UserModel } from "../../user/Schema/User.schema";

function addMonths(date: Date, months: number): Date {
     const d = new Date(date);
     d.setUTCMonth(d.getUTCMonth() + months);
     return d;
}

export const initiateController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const { plan, billingCycle } = req.body as { plan: EUserPlan; billingCycle: EBillingCycle };

          if (plan === EUserPlan.FREE) {
               return next(new ServerError("Cannot initiate payment for the FREE plan", 400));
          }

          if (!Object.values(EUserPlan).includes(plan)) {
               return next(new ServerError("Invalid plan", 400));
          }
          if (!Object.values(EBillingCycle).includes(billingCycle)) {
               return next(new ServerError("Invalid billing cycle", 400));
          }

          const amount = PLAN_PRICING[plan as Exclude<EUserPlan, EUserPlan.FREE>][billingCycle];
          const orderId = uuidv4();
          const now = new Date();
          const endDate = billingCycle === EBillingCycle.YEARLY
               ? addMonths(now, 12)
               : addMonths(now, 1);

          // Fetch user details for gateway payload
          const user = await UserModel.findOne({ _id: req.user._id }, { email: 1, name: 1 });
          if (!user) return next(new ServerError("User not found", 404));

          const result = await gatewayProvider.initiatePayment({
               orderId,
               amount,
               currency: "EGP",
               userId: req.user._id.toString(),
               userEmail: user.email,
               userName: user.name,
               plan,
               billingCycle,
          });

          // Create pending subscription record
          await SubscriptionModel.create({
               userId: req.user._id,
               plan,
               billingCycle,
               amount,
               currency: "EGP",
               status: ESubscriptionStatus.PENDING,
               gatewayOrderId: result.gatewayOrderId,
               startDate: now.toISOString().split("T")[0],
               endDate: endDate.toISOString().split("T")[0],
          });

          res.status(200).json({
               code: 200,
               status: "OK",
               success: true,
               error: false,
               timestamp: new Date(),
               message: "Payment initiated successfully",
               data: {
                    redirectUrl: result.redirectUrl,
                    iframeToken: result.iframeToken,
                    orderId,
                    amount,
                    currency: "EGP",
                    plan,
                    billingCycle,
               },
          });
     }
);
