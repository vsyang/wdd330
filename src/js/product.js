import { getParam, updateCartBadge, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

const externalServices = new ExternalServices();
const productId = getParam("id");

const productDetails = new ProductDetails(productId, externalServices);

async function init() {
  await loadHeaderFooter();
  updateCartBadge();
  productDetails.init();
}

init();