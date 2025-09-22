
import { getLocalStorage, setLocalStorage, updateCartBadge } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document.getElementById("addToCart").addEventListener("click", () => this.addProductToCart());
    }

    async renderProductDetails() {
        productDetailsTemplate(this.product);
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        const existingItem = cartItems.find(item => item.Id === this.product.Id);
        if (existingItem) {
            existingItem.Quantity = (existingItem.Quantity || 1) + 1;
        } else {
            const cartProduct = {
                ...this.product,
                Quantity: 1
            };
            cartItems.push(cartProduct);
        }
        setLocalStorage("so-cart", cartItems);
        updateCartBadge();
    }
}

function productDetailsTemplate(product) {
    document.getElementById("productBrand").textContent = product.Brand.Name;
    document.getElementById("productName").textContent = product.NameWithoutBrand;

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
        <div class="price-block">
            <p>Original Price: <span class="original-price">$${originalPrice.toFixed(2)}</span></p>
            <p class="discount">Save ${discountPercent}%</p
            <p><span class="final-price">Sale Price $${finalPrice.toFixed(2)}</span></p>
            </div>
        `;
    } else {
        priceHtml = `<span class="final-price">$${finalPrice.toFixed(2)}</span>`;
    }

    price.innerHTML = priceHtml;

    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDescription').innerHTML = product.DescriptionHtmlSimple;

}
