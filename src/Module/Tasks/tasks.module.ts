import { Router } from "express";
import { createController } from "./tasks.controller";
import { userGuard } from "../../Common/Guards/user.guard";
import { validationPipe } from "../../Common/Pipe/validationBody.pipe";
import { CreateTaskDto } from "./DTO";

const router: Router = Router()

router.post("/create", userGuard, validationPipe(CreateTaskDto), createController)

export default router
