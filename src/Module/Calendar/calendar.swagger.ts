/**
 * @openapi
 * tags:
 *   name: Calendar
 *   description: Calendar view — tasks grouped by date
 *
 * /api/v1/calendar:
 *   get:
 *     tags: [Calendar]
 *     summary: Get tasks grouped by date for a given month
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           example: 2026
 *         description: Year (defaults to current year)
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *           example: 3
 *         description: Month number 1–12 (defaults to current month)
 *     responses:
 *       200:
 *         description: Calendar data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       description: Object keyed by date (YYYY-MM-DD), each containing an array of tasks
 *                       additionalProperties:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Task'
 *                       example:
 *                         "2026-03-17":
 *                           - uuid: "abc-123"
 *                             title: "Team standup"
 *                             time: "09:00"
 *                             date: "2026-03-17"
 *                         "2026-03-20":
 *                           - uuid: "def-456"
 *                             title: "Project review"
 *                             time: "14:00"
 *                             date: "2026-03-20"
 *       400:
 *         description: Invalid month value
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
 * /api/v1/calendar/{date}:
 *   get:
 *     tags: [Calendar]
 *     summary: Get all tasks for a specific date
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *           example: "2026-03-17"
 *         description: Date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: Tasks for the specified date fetched successfully
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
 */

export {};
