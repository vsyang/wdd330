import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        this.addProductToCart = this.addProductToCart.bind(this);
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart);
    }

    async addProductToCart() {
        // get cart items from local storage, or initialize to empty array
        let cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    async renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    document.querySelector("h2").textContent = product.Brand.Name;
    document.querySelector("h3").textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;

    const price = document.getElementById('productPrice');
    const originalPrice = product.SuggestedRetailPrice;
    const finalPrice = product.FinalPrice;

    let priceHTML = `<span class="final-price">$${finalPrice.toFixed(2)}</span>`;

    if (finalPrice < originalPrice) {
        const discountPercent = Math.round(((originalPrice - finalPrice) / originalPrice) * 100);
        priceHTML += `
            <span class="original-price">$${originalPrice.toFixed(2)}</span>
            <span class="discount">Save ${discountPercent}%</span>
        `;
    }

    price.innerHTML = priceHTML;

    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}