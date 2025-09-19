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
    callback(event);
  });
  qs(selector).addEventListener("click", callback);
}

// get parameter from URL
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

// render a list of products into a parent element using a template callback
export function renderProductList(list, parentElement, templateCallback) {
  parentElement.innerHTML = ""; //
  list.forEach(item => {
    parentElement.innerHTML += templateCallback(item);
  });
}