import { getLocalStorage, setLocalStorage, updateCartBadge } from "./utils.mjs";

function cartItemTemplate(item) {
  return `
<li class="cart-card divider">
  <span class="cart-card__remove" data-id="${item.Id}" title="Remover">✖</span>
  <a href="#" class="cart-card__image">
    <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
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
    const clearCartBtn = document.getElementById("clear-cart");

    if (clearCartBtn) {
      clearCartBtn.style.display = this.cartItems.length > 0 ? "inline-block" : "none";
      clearCartBtn.onclick = () => {
        this.clearCart();
        this.renderCartContents();
      };
    }

    if (cartTotalEl)
      cartTotalEl.textContent = this.cartItems.length === 0 ? "0.00" : cartTotal.toFixed(2);

    if (productListEl) {
      productListEl.innerHTML = htmlItems.join("");

      productListEl.querySelectorAll(".cart-card__remove").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const id = btn.getAttribute("data-id");
          this.removeItem(id);
          this.renderCartContents();
        });
      });


    }

    updateCartBadge();
  }
}