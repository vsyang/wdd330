import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { addProductToCart as cartHelper, refreshCartBadge } from "./cart";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
       /* this.addProductToCart = this.addProductToCart.bind(this);
        // document
        //    .getElementById("addToCart")
        //    .addEventListener("click", this.addProductToCart);
       const btn = document.getElementById("addToCart");
       if (btn) btn.addEventListener("click", this.addProductToCart);*/
    }

    /*async addProductToCart() {
        let cartItems = getLocalStorage("so-cart");

        const productToSave = {
            Id: this.product.Id,
            Image: this.product.Image,
            Name: `${this.product.Brand.Name} ${this.product.NameWithoutBrand}`,
            Color: this.product.Colors[0].ColorName,
            FinalPrice: this.product.FinalPrice
        };

        cartItems.push(productToSave);
        setLocalStorage("so-cart", cartItems);
      
        // get cart items from local storage, or initialize to empty array
        cartHelper(this.product);
        // setLocalStorage("so-cart", cartItems);
        refreshCartBadge();
    }*/

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

    let priceHtml = "";

    if (finalPrice < originalPrice) {
        const discountPercent = Math.round(((originalPrice - finalPrice) / originalPrice) * 100);
        priceHtml = `
            <span class="original-price">$${originalPrice.toFixed(2)}</span>
            <span class="discount">Save ${discountPercent}%</span>
            <span class="final-price">$${finalPrice.toFixed(2)}</span>
        `;
    } else {
        priceHtml = `<span class="final-price">$${finalPrice.toFixed(2)}</span>`;
    }

    price.innerHTML = priceHtml;

    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    //document.getElementById('addToCart').dataset.id = product.Id;
    
    /*const btn = document.getElementById("addToCart");
    if (btn) btn.addEventListener("click", this.addProductToCart);*/
}