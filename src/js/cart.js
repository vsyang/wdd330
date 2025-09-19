import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// creates the badge in the cart
function createCartBadge() {
  const cartLink = document.querySelector(".cart a");
  if (!cartLink) return;

  const badge = document.createElement("span");
  badge.className = "cart-badge";
  badge.style.cssText = `
    position:absolute; top:-8px; right:-8px;
    background:red; color:white; font-size:0.8rem;
    font-weight:bold; border-radius:50%;
    padding:2px 6px; min-width:18px; text-align:center; display:none;
  `;
  cartLink.style.position = "relative";
  cartLink.appendChild(badge);
  return badge;
}

// atualizes the badge in the car
function updateCartBadge(badge) {
  const cartItems = getLocalStorage("so-cart") || [];
  const totalCount = cartItems.reduce((sum, item) => sum + (item.Quantity || 1), 0);
  if (!badge) return;
  badge.textContent = totalCount;
  badge.style.display = totalCount > 0 ? "inline-block" : "none";
}

// render itens in the cart
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productListEl = document.querySelector(".product-list");
  if (!productListEl) return;

  productListEl.innerHTML = cartItems.map(cartItemTemplate).join("");
}

function cartItemTemplate(item) {
  return `
<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}" />
  </a>
  <h2 class="card__name">${item.Name}</h2>
  <p class="cart-card__color">${item.Color}</p>
  <p class="cart-card__quantity">qty: ${item.Quantity || 1}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

// add product in the car, also if exsits the item
export function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  const existing = cartItems.find(item => item.Id === product.Id && item.Color === product.Color);
  if (existing) {
    existing.Quantity = (existing.Quantity || 1) + 1;
  } else {
    cartItems.push({ ...product, Quantity: 1 });
  }
  setLocalStorage("so-cart", cartItems);
  refreshCartBadge();
  renderCartContents();
}

export const badge = createCartBadge();

export function refreshCartBadge() {
  updateCartBadge(badge);
}

// initializes automatically
document.addEventListener("DOMContentLoaded", () => {
  refreshCartBadge();
  renderCartContents();
});
window.addEventListener("storage", () => refreshCartBadge());
