import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../decorators/api-requesthandler";
import { UserModel } from "../../Module/user/Schema/User.schema";
import { TaskModel } from "../../Module/Tasks/Schema/tasks.schema";
import { EUserPlan } from "../enum";
import { PLAN_LIMITS } from "../config/plans.config";
import { cache_service } from "../interceptors/cache-redis.service.fun";

const cache = new cache_service();
const CACHE_TTL = 300; // 5 minutes

function getStartOfWeek(): string {
     const now = new Date();
     const day = now.getUTCDay(); // 0 = Sunday
     const diff = now.getUTCDate() - day + (day === 0 ? -6 : 1); // Monday
     const monday = new Date(now);
     monday.setUTCDate(diff);
     monday.setUTCHours(0, 0, 0, 0);
     return monday.toISOString().split("T")[0]; // YYYY-MM-DD
}

function getTodayDate(): string {
     return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
}

export function planGuard(resource: "task" | "blog"): RequestHandler {
     return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
          const userId = req.user._id.toString();

          // Try cache first, fall back to DB
          const cacheKey = `plan_${userId}`;
          let plan: EUserPlan = await cache.getData<EUserPlan>(cacheKey);

          if (!plan) {
               const user = await UserModel.findOne({ _id: userId }, { plan: 1, planExpiry: 1 });
               if (!user) {
                    return res.status(401).json({
                         code: 401, status: "Unauthorized", success: false, error: true,
                         timestamp: new Date(), message: "User not found", data: null,
                    });
               }

               // If paid plan is expired, fall back to FREE
               if (user.plan !== EUserPlan.FREE && user.planExpiry) {
                    const expiry = new Date(user.planExpiry);
                    if (expiry < new Date()) {
                         await UserModel.updateOne({ _id: userId }, { plan: EUserPlan.FREE, planExpiry: null });
                         plan = EUserPlan.FREE;
                    } else {
                         plan = user.plan;
                    }
               } else {
                    plan = user.plan ?? EUserPlan.FREE;
               }

               await cache.setExData(cacheKey, plan, CACHE_TTL);
          }

          const limits = PLAN_LIMITS[plan];

          if (resource === "task") {
               const limit = limits.tasksPerDay;
               if (limit === Infinity) return next();

               const today = getTodayDate();
               const count = await TaskModel.countDocuments({ userId: req.user._id, date: today });

               if (count >= limit) {
                    return res.status(403).json({
                         code: 403, status: "Forbidden", success: false, error: true,
                         timestamp: new Date(),
                         message: `Daily task limit reached (${limit}). Upgrade your plan to create more tasks.`,
                         data: { limit, current: count, plan },
                    });
               }
          }

          if (resource === "blog") {
               const limit = limits.blogsPerWeek;
               if (limit === Infinity) return next();

               // Lazy import to avoid circular dependency (Blog model created after this guard)
               const { BlogModel } = await import("../../Module/Blog/Schema/blog.schema");
               const weekStart = getStartOfWeek();
               const count = await BlogModel.countDocuments({
                    userId: req.user._id,
                    weekStart: { $gte: weekStart },
               });

               if (count >= limit) {
                    return res.status(403).json({
                         code: 403, status: "Forbidden", success: false, error: true,
                         timestamp: new Date(),
                         message: `Weekly blog limit reached (${limit}). Upgrade your plan to post more blogs.`,
                         data: { limit, current: count, plan },
                    });
               }
          }

          next();
     });
}
