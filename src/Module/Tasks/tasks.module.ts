import { Router } from "express";
import { userGuard } from "../../Common/Guards/user.guard";
import { validationPipe } from "../../Common/Pipe/validationBody.pipe";
import { CreateTaskDTO, UpdateTaskDTO } from "./DTO";
import {
     createController,
     editController,
     deleteController,
     getAllController,
     getSingleController,
} from "./tasks.controller";

const router: Router = Router();

router.get("/", userGuard, getAllController);
router.get("/:id", userGuard, getSingleController);
router.post("/", userGuard, validationPipe(CreateTaskDTO), createController);
router.put("/:id", userGuard, validationPipe(UpdateTaskDTO), editController);
router.delete("/:id", userGuard, deleteController);

export default router;
