import { Router } from "express";
import { userGuard } from "../../Common/Guards/user.guard";
import { planGuard } from "../../Common/Guards/plan.guard";
import { validationPipe } from "../../Common/Pipe/validationBody.pipe";
import { CreateBlogDTO } from "./DTO";
import { createBlogController } from "./Controller/create.controller";

const router: Router = Router();

router.post("/", userGuard, planGuard("blog"), validationPipe(CreateBlogDTO), createBlogController);

export default router;
