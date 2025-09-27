import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter, updateCartBadge } from "./utils.mjs";

async function checkoutInit() {
    await loadHeaderFooter();
    updateCartBadge();
}

checkoutInit();

const checkout = new CheckoutProcess();
checkout.init();

const zipCodeInput = document.getElementById("zip");

// Recalculate totals when zip code input loses focus
zipCodeInput?.addEventListener("blur", () => {
    checkout.calculateOrderTotal();
});

// Handle form submission for checkout
document.forms["checkout-form"]?.addEventListener("submit", async (event) => {
    event.preventDefault();
    await checkout.checkout();
});