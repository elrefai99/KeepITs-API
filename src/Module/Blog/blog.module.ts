import { Router } from "express";
import { userGuard } from "../../Common/Guards/user.guard";
import { planGuard } from "../../Common/Guards/plan.guard";
import { validationPipe } from "../../Common/Pipe/validationBody.pipe";
import { CreateBlogDTO, UpdateBlogDTO } from "./DTO";
import { blogUpload } from "./multer/blog.upload";
import { createBlogController } from "./Controller/create.controller";
import { getAllBlogsController } from "./Controller/getAll.controller";
import { editBlogController }    from "./Controller/edit.controller";
import { deleteBlogController }  from "./Controller/delete.controller";

const router: Router = Router();

// Public — anyone can read
router.get("/", getAllBlogsController);

// Create — auth + plan limit + image upload + body validation
router.post(
     "/",
     userGuard,
     planGuard("blog"),
     blogUpload,
     validationPipe(CreateBlogDTO),
     createBlogController,
);

// Edit — auth + image upload + body validation (owner check inside controller)
router.put(
     "/:id",
     userGuard,
     blogUpload,
     validationPipe(UpdateBlogDTO),
     editBlogController,
);

// Delete — auth (owner check inside controller)
router.delete("/:id", userGuard, deleteBlogController);

export default router;
