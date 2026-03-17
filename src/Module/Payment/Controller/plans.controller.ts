import { Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import { EBillingCycle, EUserPlan } from "../../../Common/enum";
import { PLAN_DESCRIPTIONS, PLAN_LIMITS, PLAN_PRICING } from "../../../Common/config/plans.config";

export const plansController: RequestHandler = asyncHandler(
     async (_req: Request, res: Response) => {
          const plans = [
               {
                    name: EUserPlan.FREE,
                    description: PLAN_DESCRIPTIONS[EUserPlan.FREE],
                    limits: PLAN_LIMITS[EUserPlan.FREE],
                    pricing: null,
               },
               {
                    name: EUserPlan.GO,
                    description: PLAN_DESCRIPTIONS[EUserPlan.GO],
                    limits: PLAN_LIMITS[EUserPlan.GO],
                    pricing: {
                         [EBillingCycle.MONTHLY]: PLAN_PRICING[EUserPlan.GO][EBillingCycle.MONTHLY],
                         [EBillingCycle.YEARLY]:  PLAN_PRICING[EUserPlan.GO][EBillingCycle.YEARLY],
                    },
               },
               {
                    name: EUserPlan.PRO,
                    description: PLAN_DESCRIPTIONS[EUserPlan.PRO],
                    limits: { ...PLAN_LIMITS[EUserPlan.PRO], tasksPerDay: "unlimited", blogsPerWeek: 20 },
                    pricing: {
                         [EBillingCycle.MONTHLY]: PLAN_PRICING[EUserPlan.PRO][EBillingCycle.MONTHLY],
                         [EBillingCycle.YEARLY]:  PLAN_PRICING[EUserPlan.PRO][EBillingCycle.YEARLY],
                    },
               },
               {
                    name: EUserPlan.PLUS,
                    description: PLAN_DESCRIPTIONS[EUserPlan.PLUS],
                    limits: { tasksPerDay: "unlimited", blogsPerWeek: "unlimited" },
                    pricing: {
                         [EBillingCycle.MONTHLY]: PLAN_PRICING[EUserPlan.PLUS][EBillingCycle.MONTHLY],
                         [EBillingCycle.YEARLY]:  PLAN_PRICING[EUserPlan.PLUS][EBillingCycle.YEARLY],
                    },
               },
          ];

          res.status(200).json({
               code: 200,
               status: "OK",
               success: true,
               error: false,
               timestamp: new Date(),
               message: "Plans fetched successfully",
               data: plans,
          });
     }
);
