import { getLocalStorage, setLocalStorage, updateCartBadge } from "./utils.mjs";

// Template for a cart item
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
  <p class="cart-card__quantity">qty: 
    <input type="number" class="cart-qty-input" data-id="${item.Id}" min="1" value="${item.Quantity || 1}" style="width: 50px;">
  </p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

export default class ShoppingCart {
  constructor() {
    this.cartItems = [];
  }

  // Initialize cart from localStorage and render
  async init() {
    this.cartItems = getLocalStorage("so-cart") || [];
    this.renderCartContents();
  }

  // Add item to cart
  removeItem(itemId) {
    this.cartItems = this.cartItems.filter(item => item.Id !== itemId);
    setLocalStorage("so-cart", this.cartItems);
  }

  // Get current cart items
  getItems() {
    return this.cartItems;
  }

  // Clear all items from cart
  clearCart() {
    this.cartItems = [];
    setLocalStorage("so-cart", this.cartItems);
  }

  // Render cart contents to the page
  renderCartContents() {
    const htmlItems = this.cartItems.map(cartItemTemplate);
    const productListEl = document.querySelector(".cart-list");
    const cartTotalEl = document.getElementById("cart-total-amount");
    const cartTotal = this.cartItems.reduce((sum, item) => sum + (item.FinalPrice || 0) * (item.Quantity || 1), 0);
    const clearCartBtn = document.getElementById("clear-cart");

    // Show/hide clear cart button
    if (clearCartBtn) {
      clearCartBtn.style.display = this.cartItems.length > 0 ? "inline-block" : "none";
      clearCartBtn.onclick = () => {
        this.clearCart();
        this.renderCartContents();
      };
    }

    // Update total amount
    if (cartTotalEl)
      cartTotalEl.textContent = this.cartItems.length === 0 ? "0.00" : cartTotal.toFixed(2);

    // Verify productListEl exists before updating
    if (productListEl) {
      productListEl.innerHTML = htmlItems.join("");

      // Listener to remove item
      productListEl.querySelectorAll(".cart-card__remove").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const id = btn.getAttribute("data-id");
          this.removeItem(id);
          this.renderCartContents();
        });
      });

      // Listener to change quantity
      productListEl.querySelectorAll(".cart-qty-input").forEach(input => {
        input.addEventListener("change", (e) => {
          const id = input.getAttribute("data-id");
          let newQty = parseInt(input.value);
          if (isNaN(newQty) || newQty < 1) {
            newQty = 1;
            input.value = 1;
          }
          
          // Update quantity in the array
          this.cartItems = this.cartItems.map(item =>
            item.Id === id ? { ...item, Quantity: newQty } : item
          );
          setLocalStorage("so-cart", this.cartItems);
          this.renderCartContents();
        });
      });

      // Prevent invalid input
      productListEl.querySelectorAll(".cart-qty-input").forEach(input => {
        input.addEventListener("keydown", (e) => {
          const allowed = ["ArrowUp", "ArrowDown", "Tab", "Shift", "Control", "Alt", "Meta"];
          if (allowed.includes(e.key)) return;

          // Allow selection and copy/paste
          if ((e.ctrlKey || e.metaKey) && ["a","c","v","x"].includes(e.key.toLowerCase())) return;
          e.preventDefault();
        });
      });
    }

    updateCartBadge();
  }
}