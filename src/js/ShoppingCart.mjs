import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `
<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors?.[0]?.ColorName ?? ""}</p>
  <p class="cart-card__quantity">qty: ${item.Quantity || 1}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

export default class ShoppingCart {
  constructor() {
    this.cartItems = [];
  }

  async init() {
    this.cartItems = getLocalStorage("so-cart") || [];
    this.renderCartContents();
  }

  removeItem(itemId) {
    this.cartItems = this.cartItems.filter(item => item.Id !== itemId);
    setLocalStorage("so-cart", this.cartItems);
  }

  getItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    setLocalStorage("so-cart", this.cartItems);
  }

  renderCartContents() {
    const htmlItems = this.cartItems.map(cartItemTemplate);
    const productListEl = document.querySelector(".cart-list");
    const cartTotalEl = document.getElementById("cart-total-amount");
    const cartTotal = this.cartItems.reduce((sum, item) => sum + (item.FinalPrice || 0) * (item.Quantity || 1), 0);
    
    if (cartTotalEl)
      cartTotalEl.textContent = this.cartItems.length === 0 ? "0.00" : cartTotal.toFixed(2);
    
    if (productListEl) productListEl.innerHTML = htmlItems.join("");
  }
}