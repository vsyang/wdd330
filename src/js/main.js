//import ProductData from "./ProductData.mjs";
//import ProductList from "./ProductList.mjs";
import { refreshCartBadge } from "./cart.js";
import { loadHeaderFooter } from "./utils.mjs";

async function initMain() {
    await loadHeaderFooter();
    refreshCartBadge();
}



//const dataSource = new ProductData("tents");
//const element = document.querySelector(".product-list");

//const productList = new ProductList("Tents", dataSource, element);

initMain();


