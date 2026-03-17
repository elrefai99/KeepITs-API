import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import { SubscriptionModel } from "../Schema/subscription.schema";
import { ESubscriptionStatus } from "../../../Common/enum";

export const statusController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const subscription = await SubscriptionModel.findOne({
               userId: req.user._id,
               status: ESubscriptionStatus.ACTIVE,
          }).sort({ createdAt: -1 });

          res.status(200).json({
               code: 200,
               status: "OK",
               success: true,
               error: false,
               timestamp: new Date(),
               message: "Subscription status fetched successfully",
               data: subscription,
          });
     }
);
