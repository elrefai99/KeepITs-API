/**
 * @openapi
 * tags:
 *   name: Payment
 *   description: Subscription plans and payment gateway
 *
 * /api/v1/payment/plans:
 *   get:
 *     tags: [Payment]
 *     summary: Get all available subscription plans with pricing
 *     responses:
 *       200:
 *         description: Plans fetched successfully
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
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             enum: [FREE, GO, PRO, PLUS]
 *                           description:
 *                             type: string
 *                           limits:
 *                             type: object
 *                             properties:
 *                               tasksPerDay:
 *                                 oneOf:
 *                                   - type: integer
 *                                   - type: string
 *                                     enum: [unlimited]
 *                               blogsPerWeek:
 *                                 oneOf:
 *                                   - type: integer
 *                                   - type: string
 *                                     enum: [unlimited]
 *                           pricing:
 *                             nullable: true
 *                             type: object
 *                             properties:
 *                               MONTHLY:
 *                                 type: number
 *                               YEARLY:
 *                                 type: number
 *
 * /api/v1/payment/status:
 *   get:
 *     tags: [Payment]
 *     summary: Get the authenticated user's active subscription
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Subscription status fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       nullable: true
 *                       $ref: '#/components/schemas/Subscription'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/v1/payment/initiate:
 *   post:
 *     tags: [Payment]
 *     summary: Initiate a payment for a subscription plan
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [plan, billingCycle]
 *             properties:
 *               plan:
 *                 type: string
 *                 enum: [GO, PRO, PLUS]
 *                 example: GO
 *               billingCycle:
 *                 type: string
 *                 enum: [MONTHLY, YEARLY]
 *                 example: MONTHLY
 *     responses:
 *       200:
 *         description: Payment initiated — follow redirectUrl or embed iframeToken
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
 *                         redirectUrl:
 *                           type: string
 *                           nullable: true
 *                         iframeToken:
 *                           type: string
 *                           nullable: true
 *                         orderId:
 *                           type: string
 *                         amount:
 *                           type: number
 *                         currency:
 *                           type: string
 *                         plan:
 *                           type: string
 *                         billingCycle:
 *                           type: string
 *       400:
 *         description: Invalid plan or billing cycle
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
 * /api/v1/payment/webhook:
 *   post:
 *     tags: [Payment]
 *     summary: Payment gateway webhook callback (called by Paymob or PayFort)
 *     description: |
 *       This endpoint is called by the payment gateway after a transaction.
 *       HMAC signature is verified before processing.
 *       Always returns 200 to prevent gateway retries.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook received
 *
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         uuid:
 *           type: string
 *         userId:
 *           type: string
 *         plan:
 *           type: string
 *           enum: [FREE, GO, PRO, PLUS]
 *         billingCycle:
 *           type: string
 *           enum: [MONTHLY, YEARLY]
 *         amount:
 *           type: number
 *         currency:
 *           type: string
 *         status:
 *           type: string
 *           enum: [ACTIVE, EXPIRED, CANCELLED, PENDING]
 *         gatewayOrderId:
 *           type: string
 *           nullable: true
 *         gatewayTransactionId:
 *           type: string
 *           nullable: true
 *         startDate:
 *           type: string
 *         endDate:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

export {};
