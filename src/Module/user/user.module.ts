import { Router } from "express";
import { editController, deleteController, profileController } from "./user.controller";
import { profileGuard } from "./Guards/profile.guard";
import { userGuard } from "../../Common/Guards/user.guard";
import { uploadAvatar } from "../../Common/decorators/api-handle-files";

const router: Router = Router();

router.get("/profile", profileGuard, profileController);
router.put("/edit/:id", userGuard, uploadAvatar, editController);
router.delete("/delete/:id", userGuard, deleteController);

export default router;
