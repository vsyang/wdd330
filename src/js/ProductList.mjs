class ProductList {
    // Begin creating your ProductList module by writing the code for the constructor. There are more than one category of products that will need to be independently listed. In order to make the ProductList class as flexible and reusable as possible, the constructor should receive the following parameters:
    
    constructor(category, dataSource, listElement) {

        // the product category,
        this.category = category;
        // the dataSource, and
        this.dataSource = dataSource;
        // the HTML element (listElement) in which to render the product list (output target).
        this.listElement = listElement;
        // hold fetched products
        this.products = [];
    }

    // Finally, use the dataSource to get the list of products to work with. You could do that in the constructor or in an init() method. One advantage of the init method is that it will allow us to use async/await when calling the promise in getData().
    async init() {
        // fetch products for category
        const list = await this.dataSource.getData();
        // render list in future
    }
    // future render code here
}

export default ProductList;