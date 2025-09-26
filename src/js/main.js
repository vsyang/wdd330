import { loadHeaderFooter, updateCartBadge } from "./utils.mjs";

async function initMain() {
    await loadHeaderFooter();
    updateCartBadge();
}

initMain();


