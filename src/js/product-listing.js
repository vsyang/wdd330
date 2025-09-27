import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter, updateCartBadge } from "./utils.mjs";

const category = getParam("category");
const h2 = document.querySelector(".products h2");

if (h2 && category) {
	let categoryName = category.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
	h2.textContent = `Top Products: ${categoryName}`;
}

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);

async function productListingInit() {
	await loadHeaderFooter();
	updateCartBadge();
	productList.init();
}

productListingInit();