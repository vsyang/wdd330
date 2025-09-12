import { renderListWithTemplate } from "./utils.mjs"; // ajuste o caminho se necessário

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
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
        const products = await this.dataSource.getData();
        this.renderList(products);
    }

    renderList(products) {
        renderListWithTemplate(
            productCardTemplate,
            this.listElement,
            products,
            "afterbegin",
            true
        );
    }
}