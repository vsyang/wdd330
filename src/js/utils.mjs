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

  if (safeList.length === 0) {
    return;
  }

  const htmlStrings = safeList.map(template);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

//#9 Add a function to the utils.mjs named loadHeaderFooter
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerDisplay = document.querySelector("#main-header");
  renderWithTemplate(headerTemplate, headerDisplay);
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerDisplay = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerDisplay);
}