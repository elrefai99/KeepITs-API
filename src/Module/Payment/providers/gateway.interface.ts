export interface InitiatePayload {
     orderId: string
     amount: number
     currency: string
     userId: string
     userEmail: string
     userName: string
     plan: string
     billingCycle: string
}

export interface InitiateResult {
     redirectUrl?: string
     iframeToken?: string
     gatewayOrderId: string
     raw: Record<string, any>
}

export interface IGatewayProvider {
     initiatePayment(payload: InitiatePayload): Promise<InitiateResult>
     verifyWebhook(body: any, signature: string): boolean
     extractTransactionId(body: any): string
     extractOrderId(body: any): string
     isSuccessful(body: any): boolean
}
