import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";


const dataSource = new ProductData("tents");

const ProductList = new ProductList("Tents", dataSource, element);


