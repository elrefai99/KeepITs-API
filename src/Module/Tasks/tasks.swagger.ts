/**
 * @openapi
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 *
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         uuid:
 *           type: string
 *         title:
 *           type: string
 *         time:
 *           type: string
 *           example: "09:00"
 *         endTime:
 *           type: string
 *           nullable: true
 *           example: "10:00"
 *         startDate:
 *           type: string
 *           example: "2026-03-17"
 *         endDate:
 *           type: string
 *           nullable: true
 *           example: "2026-03-20"
 *         description:
 *           type: string
 *         date:
 *           type: string
 *           example: "2026-03-17"
 *         completed:
 *           type: boolean
 *           default: false
 *         durationDays:
 *           type: integer
 *           nullable: true
 *         order:
 *           type: integer
 *           nullable: true
 *         meetingType:
 *           type: string
 *           enum: [none, google, teams, custom]
 *           default: none
 *         meetingUrl:
 *           type: string
 *           nullable: true
 *         guestEmails:
 *           type: array
 *           items:
 *             type: string
 *             format: email
 *         dailyTimes:
 *           type: object
 *           nullable: true
 *           additionalProperties:
 *             type: object
 *             properties:
 *               time:
 *                 type: string
 *               endTime:
 *                 type: string
 *         userId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateTaskBody:
 *       type: object
 *       required: [title, time, startDate, description, date]
 *       properties:
 *         title:
 *           type: string
 *           example: Team standup
 *         time:
 *           type: string
 *           example: "09:00"
 *         endTime:
 *           type: string
 *           example: "09:30"
 *         startDate:
 *           type: string
 *           example: "2026-03-17"
 *         endDate:
 *           type: string
 *           example: "2026-03-20"
 *         description:
 *           type: string
 *           example: Daily standup meeting
 *         date:
 *           type: string
 *           example: "2026-03-17"
 *         durationDays:
 *           type: integer
 *           example: 3
 *         order:
 *           type: integer
 *           example: 1
 *         meetingType:
 *           type: string
 *           enum: [none, google, teams, custom]
 *           example: google
 *         meetingUrl:
 *           type: string
 *           example: "https://meet.google.com/abc-xyz"
 *         guestEmails:
 *           type: array
 *           items:
 *             type: string
 *             format: email
 *
 *     UpdateTaskBody:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         time:
 *           type: string
 *         endTime:
 *           type: string
 *         startDate:
 *           type: string
 *         endDate:
 *           type: string
 *         description:
 *           type: string
 *         date:
 *           type: string
 *         completed:
 *           type: boolean
 *         durationDays:
 *           type: integer
 *         order:
 *           type: integer
 *         meetingType:
 *           type: string
 *           enum: [none, google, teams, custom]
 *         meetingUrl:
 *           type: string
 *         guestEmails:
 *           type: array
 *           items:
 *             type: string
 *             format: email
 *
 * /api/v1/tasks:
 *   get:
 *     tags: [Tasks]
 *     summary: Get all tasks for the authenticated user
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   post:
 *     tags: [Tasks]
 *     summary: Create a new task
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskBody'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Task'
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
 *
 * /api/v1/tasks/{id}:
 *   get:
 *     tags: [Tasks]
 *     summary: Get a single task by UUID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task UUID
 *     responses:
 *       200:
 *         description: Task fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   put:
 *     tags: [Tasks]
 *     summary: Update a task by UUID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskBody'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
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
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   delete:
 *     tags: [Tasks]
 *     summary: Delete a task by UUID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task UUID
 *     responses:
 *       200:
 *         description: Task deleted successfully
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
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

export {};
