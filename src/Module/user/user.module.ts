import { Router } from "express";
import { profileController } from "./user.controller";
import { profilePipe } from "./Pipe/profile.pipe";

const router: Router = Router();

router.get("/profile", profilePipe, profileController);

export default router;
