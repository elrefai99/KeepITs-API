/**
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 *
 * /api/v1/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, name]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 32
 *                 example: "password123"
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 32
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: User registered successfully
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
 *       409:
 *         description: Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful — sets __ESAA (access) and __ESRA (refresh) cookies
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
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * components:
 *   schemas:
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           example: 200
 *         status:
 *           type: string
 *           example: OK
 *         success:
 *           type: boolean
 *           example: true
 *         error:
 *           type: boolean
 *           example: false
 *         timestamp:
 *           type: string
 *           format: date-time
 *         message:
 *           type: string
 *         data:
 *           nullable: true
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           example: 400
 *         status:
 *           type: string
 *           example: Bad Request
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: boolean
 *           example: true
 *         timestamp:
 *           type: string
 *           format: date-time
 *         message:
 *           type: string
 */

export { };
