import { loadHeaderFooter, updateCartBadge } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
  updateCartBadge(); // show 0 items in the badge
});
