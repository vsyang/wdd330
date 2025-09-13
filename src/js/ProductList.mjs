import { renderListWithTemplate } from "./utils.mjs";

const productPages = {
    "880RR": "marmot-ajax-3.html",
    "985RF": "northface-talus-4.html",
    "989CG": "northface-talus-4.html",
    "985PR": "northface-alpine-3.html",
    "880RT": "marmot-ajax-3.html",
    "344YJ": "cedar-ridge-rimrock-2.html",
};

function productCardTemplate(product) {
    const page = productPages[product.Id] || "index.html";
    return `<li class="product-card">
    <a href="product_pages/${page}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
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
