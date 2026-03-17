import { Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import { SubscriptionModel } from "../Schema/subscription.schema";
import { UserModel } from "../../user/Schema/User.schema";
import { ESubscriptionStatus } from "../../../Common/enum";
import { gatewayProvider } from "../providers";
import { cache_service } from "../../../Common/interceptors/cache-redis.service.fun";
import { logger } from "../../../utils/logger";

const cache = new cache_service();

export const webhookController: RequestHandler = asyncHandler(
     async (req: Request, res: Response) => {
          // Always return 200 so the gateway does not retry endlessly
          const hmacSignature = (req.headers["hmac"] || req.headers["x-hmac"] || req.body?.signature || "") as string;

          const isValid = gatewayProvider.verifyWebhook(req.body, hmacSignature);
          if (!isValid) {
               logger.warn({ message: "Payment webhook: invalid HMAC signature", body: req.body });
               return res.status(200).json({ received: true });
          }

          if (!gatewayProvider.isSuccessful(req.body)) {
               logger.info({ message: "Payment webhook: non-successful transaction", body: req.body });
               return res.status(200).json({ received: true });
          }

          const orderId = gatewayProvider.extractOrderId(req.body);
          const transactionId = gatewayProvider.extractTransactionId(req.body);

          const subscription = await SubscriptionModel.findOne({ gatewayOrderId: orderId });
          if (!subscription) {
               logger.warn({ message: "Payment webhook: subscription not found", orderId });
               return res.status(200).json({ received: true });
          }

          // Activate subscription
          await subscription.updateOne({
               status: ESubscriptionStatus.ACTIVE,
               gatewayTransactionId: transactionId,
          });

          // Update user's plan and expiry
          await UserModel.updateOne(
               { _id: subscription.userId },
               { plan: subscription.plan, planExpiry: subscription.endDate }
          );

          // Invalidate cached plan so next request re-reads from DB
          await cache.deleteData(`plan_${subscription.userId.toString()}`);

          logger.info({
               message: "Payment webhook: subscription activated",
               userId: subscription.userId,
               plan: subscription.plan,
               endDate: subscription.endDate,
          });

          res.status(200).json({ received: true });
     }
);
