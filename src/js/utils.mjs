// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  if (!data) return [];
  const parsed = JSON.parse(data);
  return Array.isArray(parsed) ? parsed : [parsed];
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const safeList = Array.isArray(list) ? list : list ? [list] : [];

  if (clear) {
    parentElement.innerHTML = "";
  }

  if (safeList.length === 0) 
    return;
  

  const htmlStrings = safeList.map(template);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
// Fetch and return template HTML
export async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load template: ${path}`);
  return res.text();
}

// Render template into target element
export function renderWithTemplate(template, target) {
  if (!target) return;
  target.innerHTML = template;
}
//#9 Add a function to the utils.mjs named loadHeaderFooter
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const headerDisplay = document.querySelector("#main-header");
  renderWithTemplate(headerTemplate, headerDisplay);
  const footerTemplate = await loadTemplate("/partials/footer.html");
  const footerDisplay = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerDisplay);
}

export function updateCartBadge() {
  const cartBadge = document.getElementById("cart-count");
  if (!cartBadge) return;
  const cartItems = getLocalStorage("so-cart") || [];
  const totalCount = cartItems.reduce((sum, item) => sum + (item.Quantity || 1), 0);
  cartBadge.textContent = totalCount;
  cartBadge.style.display = totalCount > 0 ? "inline-block" : "none";
}

export function alertMessage(message, scroll = true) {
  const alert = document.getElementById("modal");
  const msg = document.getElementById("modal-message");
  const closeAlert = document.getElementById("modal-close");

  msg.innerHTML = message;
  modal.classList.remove("modal-hidden");

  if (scroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  closeBtn.onclick = closeAlert();
}

export function closeAlert() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.classList.add("modal-hidden");
  }
}