/**
 * @openapi
 * tags:
 *   name: Blog
 *   description: Blog management (subject to per-week plan limits)
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
 *         userId:
 *           type: string
 *         weekStart:
 *           type: string
 *           description: ISO date (YYYY-MM-DD) of the Monday that starts this blog's week
 *           example: "2026-03-16"
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 * /api/v1/blog:
 *   post:
 *     tags: [Blog]
 *     summary: Create a blog post
 *     description: |
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
 *         application/json:
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
 */

export {};
