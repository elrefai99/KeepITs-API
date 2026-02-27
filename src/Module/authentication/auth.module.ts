import { Router } from "express";
import { validationPipe } from "../../Common/Pipe/validationBody.pipe";
import { RegisterDTO } from "./DTO";
import { registerController } from "./auth.controller";

const router: Router = Router();

router.post("/register", validationPipe(RegisterDTO), registerController);

export default router;
