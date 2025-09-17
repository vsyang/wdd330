import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function createCartBadge() {
    const cartLink = document.querySelector(".cart a");
    if (!cartLink) return;

    const badgeE1 = document.createElement("span");
    badgeE1.style.position = "absolute";
    badgeE1.style.top = "-8px";
    badgeE1.style.right = "-8px";
    badgeE1.style.backgroundColor = "red";
    badgeE1.style.color = "white";
    badgeE1.style.fontSize = "0.8rem";
    badgeE1.style.fontWeight = "bold";
    badgeE1.style.borderRadius = "50%";
    badgeE1.style.padding = "2px 6px";
    badgeE1.style.minWidth = "18px";
    badgeE1.style.textAlign = "center";
    badgeE1.style.display = "none";
    badgeE1.className = "cart-badge";

    cartLink.style.position = "relative";
    cartLink.appendChild(badgeE1);

    return badgeE1;
}

function updateCartBadge(cartBadge) {
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
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.Quantity || 1}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>
`;
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

    renderCartContents();
}

export const badge = createCartBadge();

export function refreshCartBadge() {
  updateCartBadge(badge);
}

document.addEventListener("DOMContentLoaded", () => {
  refreshCartBadge();
});

window.addEventListener("storage", () => {
  refreshCartBadge();
});

renderCartContents();
