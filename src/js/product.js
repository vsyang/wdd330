import { getParam, updateCartBadge, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData();
const productId = getParam("id");

const productDetails = new ProductDetails(productId, dataSource);

async function init() {
  await loadHeaderFooter();
  updateCartBadge();
  productDetails.init();
}

init();