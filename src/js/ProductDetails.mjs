import ProductData from "./ProductData.mjs";
import { addProductToCart, refreshCartBadge } from "./cart.js";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = null;
    }

    async init() {
        this.product = await this.dataSource.findProductByName(this.productId);
        if (!this.product) return;

        this.renderProductDetails();

        const btn = document.getElementById("addToCart");
        if (btn) {
            btn.addEventListener("click", () => {
                this.addProductToCart();
            });
        }
    }

    addProductToCart() {
        if (!this.product) return;

        const productToSave = {
            Id: this.product.Id,
            Image: this.product.Image,
            Name: `${this.product.Brand?.Name || ""} ${this.product.NameWithoutBrand || ""}`.trim(),
            Color: this.product.Colors?.[0]?.ColorName || "",
            FinalPrice: this.product.FinalPrice
        };

        addProductToCart(productToSave);

        refreshCartBadge();
    }

    renderProductDetails() {
        if (!this.product) return;

        const detailSection = document.getElementById("product-detail");
        if (detailSection) detailSection.style.display = "block";

        const product = this.product;
        document.getElementById("productBrand").textContent = product.Brand?.Name || "";
        document.getElementById("productName").textContent = product.NameWithoutBrand || "";
        document.getElementById("productImage").src = product.Image || "";
        document.getElementById("productImage").alt = product.NameWithoutBrand || "";
        document.getElementById("productPrice").textContent = `$${product.FinalPrice || ""}`;
        document.getElementById("productColor").textContent = product.Colors?.[0]?.ColorName || "";
        document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple || "";
    }
}