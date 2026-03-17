import { IGatewayProvider } from "./gateway.interface";
import { PaymobProvider } from "./paymob.provider";
import { PayfortProvider } from "./payfort.provider";

const gateway = process.env.PAYMENT_GATEWAY?.toLowerCase();

let gatewayProvider: IGatewayProvider;

if (gateway === "payfort") {
     gatewayProvider = new PayfortProvider();
} else {
     // Default to Paymob
     gatewayProvider = new PaymobProvider();
}

export { gatewayProvider };
export type { IGatewayProvider };
