import crypto from "crypto";
import { IGatewayProvider, InitiatePayload, InitiateResult } from "./gateway.interface";

/**
 * PayFort (Amazon Payment Services) Provider
 * Docs: https://paymentservices.amazon.com/docs
 * Flow: 1. Build signed request → 2. POST to fort → 3. 3DS redirect → 4. Webhook callback
 */
export class PayfortProvider implements IGatewayProvider {
     private readonly accessCode = process.env.PAYFORT_ACCESS_CODE as string;
     private readonly merchantIdentifier = process.env.PAYFORT_MERCHANT_IDENTIFIER as string;
     private readonly shaRequestPhrase = process.env.PAYFORT_SHA_REQUEST_PHRASE as string;
     private readonly shaResponsePhrase = process.env.PAYFORT_SHA_RESPONSE_PHRASE as string;
     private readonly baseUrl = "https://paymentservices.amazon.com/FortAPI/paymentPage";

     private sign(params: Record<string, any>, phrase: string): string {
          const sorted = Object.keys(params).sort().reduce<Record<string, any>>((acc, k) => {
               acc[k] = params[k];
               return acc;
          }, {});
          const str = phrase + Object.entries(sorted).map(([k, v]) => `${k}=${v}`).join("") + phrase;
          return crypto.createHash("sha256").update(str).digest("hex");
     }

     async initiatePayment(payload: InitiatePayload): Promise<InitiateResult> {
          const params: Record<string, any> = {
               command: "PURCHASE",
               access_code: this.accessCode,
               merchant_identifier: this.merchantIdentifier,
               merchant_reference: payload.orderId,
               amount: Math.round(payload.amount * 100),
               currency: payload.currency,
               language: "en",
               customer_email: payload.userEmail,
               customer_name: payload.userName,
          };

          params.signature = this.sign(params, this.shaRequestPhrase);

          const queryString = new URLSearchParams(
               Object.entries(params).map(([k, v]) => [k, String(v)])
          ).toString();

          return {
               redirectUrl: `${this.baseUrl}?${queryString}`,
               gatewayOrderId: payload.orderId,
               raw: params,
          };
     }

     verifyWebhook(body: any, _signature: string): boolean {
          const { signature, ...rest } = body;
          const computed = this.sign(rest, this.shaResponsePhrase);
          return computed === signature;
     }

     extractTransactionId(body: any): string {
          return String(body.fort_id ?? "");
     }

     extractOrderId(body: any): string {
          return String(body.merchant_reference ?? "");
     }

     isSuccessful(body: any): boolean {
          return body.status === "14"; // PayFort success status code
     }
}
