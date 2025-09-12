import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents.json");

const listElement = document.querySelector("#product-list");

const productList = new ProductList("tents", dataSource, listElement);
productList.init();