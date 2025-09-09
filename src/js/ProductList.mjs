import { renderListWithTemplate } from "./utils.mjs";

// Create a template function that will simply return a template literal string for each of the templates needed. At the top of your ProductList module add a function for a productCardTemplate(product). You can use the current HTML in the /index.html file as your starting point.
function productCardTemplate(product) {
    return `
    <li class="product-card">
        <a href="product_pages/?product=${product.Id}">
            <img src="${product.Image}" alt="${product.Name}">
            <h2 class="card__brand">${product.Brand.Name}</h2>
            <h3 class="card__name">${product.Name}</h3>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`;
}




export default class ProductList {
    // Begin creating your ProductList module by writing the code for the constructor. There are more than one category of products that will need to be independently listed. In order to make the ProductList class as flexible and reusable as possible, the constructor should receive the following parameters:
    
    constructor(category, dataSource, listElement) {

        // the product category,
        this.category = category;
        // the dataSource, and
        this.dataSource = dataSource;
        // the HTML element (listElement) in which to render the product list (output target).
        this.listElement = listElement;
    }

    // Finally, use the dataSource to get the list of products to work with. You could do that in the constructor or in an init() method. One advantage of the init method is that it will allow us to use async/await when calling the promise in getData().
    async init() {
        // fetch products for category
        const list = await this.dataSource.getData();
        // render list in future
        this.renderList(list);
    }
    // future render code here
    renderList(list) {
        // const htmlStrings = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(''));
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}

