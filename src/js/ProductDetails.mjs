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

    document.getElementById('productPrice').textContent = product.FinalPrice;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}
