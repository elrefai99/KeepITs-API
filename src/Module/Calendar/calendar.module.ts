import { Router } from "express";
import { userGuard } from "../../Common/Guards/user.guard";
import { monthController } from "./Controller/month.controller";
import { dayController } from "./Controller/day.controller";

const router: Router = Router();

router.get("/", userGuard, monthController);
router.get("/:date", userGuard, dayController);

export default router;
