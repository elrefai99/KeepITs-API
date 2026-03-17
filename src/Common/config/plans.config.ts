import { EBillingCycle, EUserPlan } from "../enum";

export const PLAN_LIMITS: Record<EUserPlan, { tasksPerDay: number; blogsPerWeek: number }> = {
     [EUserPlan.FREE]: { tasksPerDay: 3,        blogsPerWeek: 1 },
     [EUserPlan.GO]:   { tasksPerDay: 24,       blogsPerWeek: 6 },
     [EUserPlan.PRO]:  { tasksPerDay: Infinity, blogsPerWeek: 20 },
     [EUserPlan.PLUS]: { tasksPerDay: Infinity, blogsPerWeek: Infinity },
};

export const PLAN_PRICING: Record<Exclude<EUserPlan, EUserPlan.FREE>, Record<EBillingCycle, number>> = {
     [EUserPlan.GO]: {
          [EBillingCycle.MONTHLY]: Number(process.env.PLAN_GO_MONTHLY_PRICE) || 9.99,
          [EBillingCycle.YEARLY]:  Number(process.env.PLAN_GO_YEARLY_PRICE)  || 99.99,
     },
     [EUserPlan.PRO]: {
          [EBillingCycle.MONTHLY]: Number(process.env.PLAN_PRO_MONTHLY_PRICE) || 19.99,
          [EBillingCycle.YEARLY]:  Number(process.env.PLAN_PRO_YEARLY_PRICE)  || 199.99,
     },
     [EUserPlan.PLUS]: {
          [EBillingCycle.MONTHLY]: Number(process.env.PLAN_PLUS_MONTHLY_PRICE) || 29.99,
          [EBillingCycle.YEARLY]:  Number(process.env.PLAN_PLUS_YEARLY_PRICE)  || 299.99,
     },
};

export const PLAN_DESCRIPTIONS: Record<EUserPlan, string> = {
     [EUserPlan.FREE]: "Get started with basic task management",
     [EUserPlan.GO]:   "For power users managing bigger workloads",
     [EUserPlan.PRO]:  "Unlimited tasks with expanded blogging",
     [EUserPlan.PLUS]: "Everything unlimited — the full experience",
};
