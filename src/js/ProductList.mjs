import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    let discount = "";
    let suggestedPrice = "";

    if (product.FinalPrice < product.SuggestedRetailPrice) {
        const discountPercent = Math.round(
            ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100);
        discount = `<p class="discount">Discount: ${discountPercent}%</p>`
        suggestedPrice = `<span class="original-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>`;
    }

    return `<li class="product-card">
        <a href="/product_pages/index.html?id=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.NameWithoutBrand}">
            <h3 class="card__brand">${product.Brand?.Name || "Unknown Brand"}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p>Original Price: ${suggestedPrice} </P>  
            ${discount}  
            <p class="product-card__price">Final Price: $${product.FinalPrice.toFixed(2)}</p>
            
        </a>
        </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}
