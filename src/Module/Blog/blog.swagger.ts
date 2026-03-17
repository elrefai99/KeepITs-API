/**
 * @openapi
 * tags:
 *   name: Blog
 *   description: Blog management (create is subject to per-week plan limits)
 *
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         uuid:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *           description: HTML or Markdown body; may contain embedded image URLs from contentImages
 *         coverImage:
 *           type: string
 *           nullable: true
 *           description: Cloudinary URL of the main cover image
 *         contentImages:
 *           type: array
 *           items:
 *             type: string
 *           description: Cloudinary URLs of images embedded inside the blog content
 *         userId:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             username:
 *               type: string
 *             avatar:
 *               type: string
 *               nullable: true
 *         weekStart:
 *           type: string
 *           description: ISO date (YYYY-MM-DD) of the Monday that starts this blog's week
 *           example: "2026-03-16"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 * /api/v1/blog:
 *   get:
 *     tags: [Blog]
 *     summary: Get all blog posts (public)
 *     description: Returns all blogs sorted by newest first. Paginated via query params.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           maximum: 50
 *         description: Items per page (max 50)
 *     responses:
 *       200:
 *         description: Blogs fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         blogs:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Blog'
 *                         pagination:
 *                           type: object
 *                           properties:
 *                             total:
 *                               type: integer
 *                             page:
 *                               type: integer
 *                             limit:
 *                               type: integer
 *                             totalPages:
 *                               type: integer
 *
 *   post:
 *     tags: [Blog]
 *     summary: Create a blog post
 *     description: |
 *       Accepts `multipart/form-data`. Optionally upload:
 *       - **coverImage** — a single cover/header image
 *       - **contentImages** — up to 10 images for inline use inside the blog body
 *
 *       The response includes the uploaded image URLs so the client can reference them inside `content`.
 *
 *       Subject to weekly blog limits based on the user's plan:
 *       - FREE: 1 blog/week
 *       - GO: 6 blogs/week
 *       - PRO: 20 blogs/week
 *       - PLUS: unlimited
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 example: My first blog post
 *               content:
 *                 type: string
 *                 minLength: 10
 *                 example: This is the content of my blog post...
 *               coverImage:
 *                 type: string
 *                 format: binary
 *                 description: Main cover/header image (jpeg, png, webp, gif — max 10 MB)
 *               contentImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Up to 10 inline images (jpeg, png, webp, gif — max 10 MB each)
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Weekly blog limit reached for current plan
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ErrorResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         limit:
 *                           type: integer
 *                         current:
 *                           type: integer
 *                         plan:
 *                           type: string
 *
 * /api/v1/blog/{id}:
 *   put:
 *     tags: [Blog]
 *     summary: Edit a blog post (owner only)
 *     description: |
 *       Accepts `multipart/form-data`. All fields optional.
 *       - Uploading a new **coverImage** replaces and deletes the old one from Cloudinary.
 *       - Uploading new **contentImages** replaces ALL existing content images.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog UUID
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *               content:
 *                 type: string
 *                 minLength: 10
 *               coverImage:
 *                 type: string
 *                 format: binary
 *                 description: New cover image (replaces existing)
 *               contentImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: New content images (replaces all existing content images)
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Not the blog owner
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     tags: [Blog]
 *     summary: Delete a blog post (owner only)
 *     description: Deletes the blog and removes all associated Cloudinary images.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog UUID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Not the blog owner
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

export {};
