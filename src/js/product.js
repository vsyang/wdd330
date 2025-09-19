import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam } from "./utils.mjs";

const dataSource = new ProductData("tents");
const searchTerm = new URLSearchParams(window.location.search).get("q");
const productId = getParam("product");

const isProductPages = window.location.pathname.includes('/product_pages/');

if (productId) {
  const product = new ProductDetails(productId, dataSource);
  product.init();
} else {
  showProductList();
}

async function showProductList() {
  const products = await dataSource.getData();
  const listElement = document.querySelector("#product-list");
  if (!listElement) return;

  const filtered = searchTerm
    ? products.filter(p => {
      const name = (p.Name || p.NameWithoutBrand || "").toLowerCase();
      const brand = (p.Brand?.Name || "").toLowerCase();
      return name.includes(searchTerm.toLowerCase()) || brand.includes(searchTerm.toLowerCase());
    })
    : products;

  const template = (product) => {
    const prefix = isProductPages ? "" : "product_pages/";
    const brand = product.Brand?.Name || "";
    const title = product.NameWithoutBrand || product.Name || "";
    const img = product.Image || "";
    const price = product.FinalPrice != null ? `$${product.FinalPrice}` : "";

    const fileName = product.FileName || "index.html"; //
    const productLink = `${prefix}${fileName}`;

    return `
    <li class="product-card">
      <a href="${productLink}">
        <img src="${img}" alt="${title}" />
        <h2 class="card__brand">${brand}</h2>
        <h3 class="card__name">${title}</h3>
        <p class="product-card__price">${price}</p>
      </a>
    </li>
  `;
  };

  listElement.innerHTML = "";
  filtered.forEach(p => listElement.insertAdjacentHTML("beforeend", template(p)));
}