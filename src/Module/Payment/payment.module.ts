import { Router } from "express";
import { userGuard } from "../../Common/Guards/user.guard";
import { validationPipe } from "../../Common/Pipe/validationBody.pipe";
import { plansController } from "./Controller/plans.controller";
import { statusController } from "./Controller/status.controller";
import { initiateController } from "./Controller/initiate.controller";
import { webhookController } from "./Controller/webhook.controller";
import { InitiatePaymentDTO } from "./DTO";

const router: Router = Router();

router.get("/plans", plansController);
router.get("/status", userGuard, statusController);
router.post("/initiate", userGuard, validationPipe(InitiatePaymentDTO), initiateController);
router.post("/webhook", webhookController);

export default router;
