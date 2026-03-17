import crypto from "crypto";
import { IGatewayProvider, InitiatePayload, InitiateResult } from "./gateway.interface";

/**
 * Paymob Payment Provider
 * Docs: https://developers.paymob.com
 * Flow: 1. Auth token → 2. Order registration → 3. Payment key → 4. Iframe embed
 */
export class PaymobProvider implements IGatewayProvider {
     private readonly apiKey = process.env.PAYMOB_API_KEY as string;
     private readonly integrationId = process.env.PAYMOB_INTEGRATION_ID as string;
     private readonly iframeId = process.env.PAYMOB_IFRAME_ID as string;
     private readonly hmacSecret = process.env.PAYMOB_HMAC_SECRET as string;
     private readonly baseUrl = "https://accept.paymob.com/api";

     private async getAuthToken(): Promise<string> {
          const res = await fetch(`${this.baseUrl}/auth/tokens`, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ api_key: this.apiKey }),
          });
          const data: any = await res.json();
          return data.token;
     }

     private async registerOrder(token: string, payload: InitiatePayload): Promise<string> {
          const res = await fetch(`${this.baseUrl}/ecommerce/orders`, {
               method: "POST",
               headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
               body: JSON.stringify({
                    auth_token: token,
                    delivery_needed: false,
                    amount_cents: Math.round(payload.amount * 100),
                    currency: payload.currency,
                    merchant_order_id: payload.orderId,
                    items: [],
               }),
          });
          const data: any = await res.json();
          return String(data.id);
     }

     private async getPaymentKey(token: string, paymobOrderId: string, payload: InitiatePayload): Promise<string> {
          const res = await fetch(`${this.baseUrl}/acceptance/payment_keys`, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                    auth_token: token,
                    amount_cents: Math.round(payload.amount * 100),
                    expiration: 3600,
                    order_id: paymobOrderId,
                    currency: payload.currency,
                    integration_id: this.integrationId,
                    billing_data: {
                         first_name: payload.userName.split(" ")[0] || "N/A",
                         last_name: payload.userName.split(" ")[1] || "N/A",
                         email: payload.userEmail,
                         phone_number: "N/A",
                         apartment: "N/A",
                         floor: "N/A",
                         street: "N/A",
                         building: "N/A",
                         shipping_method: "N/A",
                         postal_code: "N/A",
                         city: "N/A",
                         country: "N/A",
                         state: "N/A",
                    },
               }),
          });
          const data: any = await res.json();
          return data.token;
     }

     async initiatePayment(payload: InitiatePayload): Promise<InitiateResult> {
          const authToken = await this.getAuthToken();
          const paymobOrderId = await this.registerOrder(authToken, payload);
          const paymentKey = await this.getPaymentKey(authToken, paymobOrderId, payload);

          return {
               iframeToken: paymentKey,
               redirectUrl: `https://accept.paymob.com/api/acceptance/iframes/${this.iframeId}?payment_token=${paymentKey}`,
               gatewayOrderId: paymobOrderId,
               raw: { authToken, paymobOrderId, paymentKey },
          };
     }

     verifyWebhook(body: any, signature: string): boolean {
          const fields = [
               body.amount_cents, body.created_at, body.currency, body.error_occured,
               body.has_parent_transaction, body.id, body.integration_id, body.is_3d_secure,
               body.is_auth, body.is_capture, body.is_refunded, body.is_standalone_payment,
               body.is_voided, body.order?.id, body.owner, body.pending,
               body.source_data?.pan, body.source_data?.sub_type, body.source_data?.type,
               body.success,
          ];
          const concatenated = fields.map(v => String(v ?? "")).join("");
          const hash = crypto.createHmac("sha512", this.hmacSecret).update(concatenated).digest("hex");
          return hash === signature;
     }

     extractTransactionId(body: any): string {
          return String(body.id ?? "");
     }

     extractOrderId(body: any): string {
          return String(body.order?.merchant_order_id ?? "");
     }

     isSuccessful(body: any): boolean {
          return body.success === true && body.pending === false;
     }
}
