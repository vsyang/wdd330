import { refreshCartBadge } from "./cart.js";
import { loadHeaderFooter } from "./utils.mjs";

async function initMain() {
    await loadHeaderFooter();
    refreshCartBadge();
}

initMain();


