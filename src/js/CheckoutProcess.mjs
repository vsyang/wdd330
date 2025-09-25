import { ExternalServices } from "./ProductData.mjs";

export default class CheckoutProcess {
    
    async checkout() {
        try {
            const orderSummary = this.order() //will need to change name to whatever we chose for the order summary info

            const result = await this.orderedItems.checkout(orderSummary);
        } catch(err) {
            if (err?.name === "servicesError") {
                const msg = this.userErrorMessage(err.message);
                alertMessage(`Checkout failed: ${msg}`, true);
            }
        }
    }
}