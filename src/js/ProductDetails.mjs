
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { addProductToCart as cartHelper, refreshCartBadge } from "./cart.js";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
    }

    async renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    document.getElementById("productBrand").textContent = product.Brand.Name;
    document.getElementById("productName").textContent = product.NameWithoutBrand;
    //document.querySelector("productBrand").textContent = product.Brand.Name;
    //document.querySelector("productName").textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Images.PrimaryLarge;
    productImage.alt = product.NameWithoutBrand;

    const price = document.getElementById('productPrice');
    const originalPrice = product.SuggestedRetailPrice;
    const finalPrice = product.FinalPrice;

    let priceHtml = "";

    if (finalPrice < originalPrice) {
        const discountPercent = Math.round(((originalPrice - finalPrice) / originalPrice) * 100);
        priceHtml = `
            <p>Original Price: <span class="original-price">$${originalPrice.toFixed(2)}</span></p>
            <p class="discount">Save ${discountPercent}%</p
            <p><span class="final-price">Sale Price $${finalPrice.toFixed(2)}</span></p>
        `;
    } else {
        priceHtml = `<span class="final-price">$${finalPrice.toFixed(2)}</span>`;
    }

    price.innerHTML = priceHtml;

    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDescription').innerHTML = product.DescriptionHtmlSimple;

}
