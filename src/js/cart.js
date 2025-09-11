import { getLocalStorage, setLocalStorage } from "./utils.mjs";

/* ---------------------- CART BADGE ---------------------- */
function createCartBadge() {
    const cartLink = document.querySelector(".cart a");
    if (!cartLink) return;

    const badge = document.createElement("span");
    badge.style.position = "absolute";
    badge.style.top = "-8px";
    badge.style.right = "-8px";
    badge.style.backgroundColor = "red";
    badge.style.color = "white";
    badge.style.fontSize = "0.8rem";
    badge.style.fontWeight = "bold";
    badge.style.borderRadius = "50%";
    badge.style.padding = "2px 6px";
    badge.style.minWidth = "18px";
    badge.style.textAlign = "center";
    badge.style.display = "none";
    badge.className = "cart-badge";

    cartLink.style.position = "relative";
    cartLink.appendChild(badge);

    return badge;
}

function updateCartBadge(badge) {
    const cartItems = getLocalStorage("so-cart") || [];
    const totalCount = cartItems.reduce((sum, item) => sum + (item.Quantity || 1), 0);

    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? "inline-block" : "none";
}

/* ---------------------- CART PAGE ---------------------- */
function renderCartContents() {
    const cartItems = getLocalStorage("so-cart") || [];
    const htmlItems = cartItems.map(cartItemTemplate);
    const productListEl = document.querySelector(".product-list");
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

/* ---------------------- ADD PRODUCT TO CART ---------------------- */
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

    // Update badge immediately
    if (badge) updateCartBadge(badge);

    // Re-render cart if on cart page
    renderCartContents();
}

/* ---------------------- INITIALIZE ---------------------- */
const badge = createCartBadge();
updateCartBadge(badge);
renderCartContents();
