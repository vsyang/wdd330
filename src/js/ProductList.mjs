import { renderListWithTemplate } from "./utils.mjs";

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
        const template = (product) => {
            const brand = product.Brand?.Name || "";
            const title = product.NameWithoutBrand || product.Name || "";
            const img = product.Image || "";
            const price = product.FinalPrice != null ? `$${product.FinalPrice}` : "";

            return `
<li class="product-card">
  <a href="product.html?product=${product.Id}">
    <img src="${img}" alt="${title}" />
    <h2 class="card__brand">${brand}</h2>
    <h3 class="card__name">${title}</h3>
    <p class="product-card__price">${price}</p>
  </a>
</li>`;
        };

        renderListWithTemplate(template, this.listElement, list);
    }
}
