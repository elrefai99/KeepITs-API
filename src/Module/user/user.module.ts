import { Router } from "express";
import { editController, deleteController, profileController } from "./user.controller";
import { profilePipe } from "./Pipe/profile.pipe";

const router: Router = Router();

router.get("/profile", profilePipe, profileController);
router.put("/edit/:id", profilePipe, editController);
router.delete("/delete/:id", profilePipe, deleteController);

export default router;
