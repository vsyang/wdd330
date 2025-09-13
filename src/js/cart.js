import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  console.log("cartItems from localStorage:", cartItems, " | Type:", typeof cartItems);

  const container = document.querySelector(".product-list");
  if (!container) {
    console.warn("⚠️ Element .product-list not found in DOM.");
    return;
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  container.innerHTML = htmlItems.join("");
}

document.addEventListener("DOMContentLoaded", renderCartContents);

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Color}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}