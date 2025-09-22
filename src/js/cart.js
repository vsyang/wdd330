import { loadHeaderFooter, updateCartBadge } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const shoppingCart = new ShoppingCart();

async function initCart() {
  await loadHeaderFooter();
  updateCartBadge();
  shoppingCart.init();
}

initCart();
