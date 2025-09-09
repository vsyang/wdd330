import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");

const element = document.querySelector(".product_list");

const productList = new ProductList("Tents", dataSource, element);

productList.inut();

