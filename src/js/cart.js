import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function createCartBadge() {
  const cartLink = document.querySelector(".cart a");
  if (!cartLink) return null;

  let badgeEl = cartLink.querySelector(".cart-badge");
  if (badgeEl) return badgeEl;

  badgeEl = document.createElement("span");
  badgeEl.className = "cart-badge";
  Object.assign(badgeEl.style, {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    backgroundColor: "red",
    color: "white",
    fontSize: "0.8rem",
    fontWeight: "bold",
    borderRadius: "50%",
    padding: "2px 6px",
    minWidth: "18px",
    textAlign: "center",
    display: "none",
  });

  cartLink.style.position = "relative";
  cartLink.appendChild(badgeEl);
  return badgeEl;
}

function updateCartBadge(cartBadge) {
  if (!cartBadge) return;
  const cartItems = getLocalStorage("so-cart") || [];
  const totalCount = cartItems.reduce((sum, item) => sum + (item.Quantity || 1), 0);
  cartBadge.textContent = totalCount;
  cartBadge.style.display = totalCount > 0 ? "inline-block" : "none";
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map(cartItemTemplate);
  const productListEl = document.querySelector(".cart-list");
  if (productListEl) productListEl.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  return `
<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.NameWithoutBrand}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.NameWithoutBrand}</h2>
  </a>
  <p class="cart-card__color">${item.Colors?.[0]?.ColorName ?? ""}</p>
  <p class="cart-card__quantity">qty: ${item.Quantity || 1}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

export function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  const existingItem = cartItems.find(item => item.Id === product.Id);
  if (existingItem) {
    existingItem.Quantity = (existingItem.Quantity || 1) + 1;
  } else {
    product.Quantity = 1;
    cartItems.push(product);
  }
  setLocalStorage("so-cart", cartItems);
  refreshCartBadge();
  renderCartContents(); // no-op if not on cart page
}

export function refreshCartBadge() {
  // Create if missing (e.g., header just got injected)
  if (!window.cartBadge) window.cartBadge = createCartBadge();
  updateCartBadge(window.cartBadge);
}

// After DOM is ready (and header likely injected), build badge + render cart
function init() {
  window.cartBadge = createCartBadge();
  refreshCartBadge();
  renderCartContents();
  window.addEventListener("storage", refreshCartBadge);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
