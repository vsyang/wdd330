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
            <p>Original Price: ${suggestedPrice} </p>  
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
        this.products = []; // initialize products as an empty array - prep for sorting
    }

    async init() {
        this.products = await this.dataSource.getData(this.category);
        this.renderList(this.products);

        const sortSelect = document.getElementById("sort");
        if (sortSelect) {
            sortSelect.addEventListener("change", (event) => {
                const sortType = event.target.value;
                this.sortProducts(sortType);
            });
        }
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
    }
    sortProducts(sortType) {
        let sorted = [...this.products]; // Create a copy of the products array

        switch (sortType) {
            case "price-asc":
                sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
                break;
            case "price-desc":
                sorted.sort((a, b) => b.FinalPrice - a.FinalPrice);
                break;
            case "name-asc":
                sorted.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
                break;
            case "name-desc":
                sorted.sort((a, b) => b.NameWithoutBrand.localeCompare(a.NameWithoutBrand));
                break;
            case "brand-asc":
                sorted.sort((a, b) => {
                    const brandA = a.Brand?.Name || "";
                    const brandB = b.Brand?.Name || "";
                    return brandA.localeCompare(brandB);
                });
                break;
            case "brand-desc":
                sorted.sort((a, b) => {
                    const brandA = a.Brand?.Name || "";
                    const brandB = b.Brand?.Name || "";
                    return brandB.localeCompare(brandA);
                });
                break;
            case "discount-desc":
                sorted.sort((a, b) => {
                    const discountA = a.SuggestedRetailPrice ? (a.SuggestedRetailPrice - a.FinalPrice) / a.SuggestedRetailPrice : 0;
                    const discountB = b.SuggestedRetailPrice ? (b.SuggestedRetailPrice - b.FinalPrice) / b.SuggestedRetailPrice : 0;
                    return discountB - discountA;
                });
                break;
            case "discount-asc":
                sorted.sort((a, b) => {
                    const discountA = a.SuggestedRetailPrice ? (a.SuggestedRetailPrice - a.FinalPrice) / a.SuggestedRetailPrice : 0;
                    const discountB = b.SuggestedRetailPrice ? (b.SuggestedRetailPrice - b.FinalPrice) / b.SuggestedRetailPrice : 0;
                    return discountA - discountB;
                });
                break;
            default:
                // No sorting
                break;
        }
        this.renderList(sorted);
    }
}
