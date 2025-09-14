import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    // need to check for discount
    let discount = "";
    let suggestedPrice = "";

    if (product.FinalPrice < product.SuggestedRetailPrice) {   //check to see if final price less than suggested retail price
        const discountPercent = Math.round( // finding discount percentage
            ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100);
        discount = `<p class="discount-percent">Discount: ${discountPercent}%</p>`
        suggestedPrice = '<p class="suggested-price">$${product.SuggestedRetailPrice}</p>';
    }

    return `<li class="product-card">
        <a href="/product_pages/?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.NameWithoutBrand}">
            <h3 class="card__brand">${product.Brand?.Name || "Unknown Brand"}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            ${suggestedPrice}   
            ${discount}  
            <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
            
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
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    renderList(list) {
        // const htmlStrings = list.map(productCardTemplate);
        //this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}