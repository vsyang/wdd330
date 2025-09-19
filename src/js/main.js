import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { refreshCartBadge } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
    
    const element = document.querySelector("#product-list");
    if (!element) return;

    const dataSource = new ProductData("tents");

    const productList = new ProductList("tents", dataSource, element);
    try {
        await productList.init();
    } catch (err) {
        console.error("Erro ao inicializar ProductList:", err);
    }

    refreshCartBadge();
});
