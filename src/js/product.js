import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { addProductToCart } from "./cart.js";

/*function addProductToCart(product) {
  // get cart items from local storage, or initialize to empty array
  let cartItems = getLocalStorage("so-cart");
  cartItems.push(item);
  setLocalStorage("so-cart", cartItems);
}*/

const dataSource = new ProductData();
const productId = getParam("id");



const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

document.getElementById("addToCart").addEventListener("click", async() => {
  const productData = await dataSource.findProductById(productId);
  addProductToCart(productData);
});