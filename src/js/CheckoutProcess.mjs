import  { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const externalServices = new ExternalServices();

// Package cart items into a simplified array for order submission
function packageItems() {
    const items = this.cartItems.map(item => ({
        id: item.Id,
        name: item.Name,
        price: item.FinalPrice,
        quantity: item.Quantity
    }));
    return items;
}

// Convert form data to a JSON object
function formatDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    return data;
}

export default class CheckoutProcess {
    constructor() {
        this.cartItems = [];
        this.itemTotal = 1;
        this.shipping  = 0;
        this.tax = 0;
        this.totalAmount = 0;
    }

    // Initialize cart from localStorage and render
    init(){
        this.cartItems = getLocalStorage("so-cart") || [];
        this.calculateSubtotal();
    }

    // Calculate subtotal of cart items and update display
    calculateSubtotal(){
        const subTotal = this.cartItems.reduce((sum, item) => sum + (item.FinalPrice || 0) * (item.Quantity || 1), 0);
        const subTotalElement = document.getElementById("order-subtotal-amount");
        this.itemTotal = subTotal;
        if(subTotalElement){
            subTotalElement.textContent = subTotal.toFixed(2);
        }
    }

    // Calculate total including tax and shipping and call display function
    calculateOrderTotal() {
        this.shipping = 0;    //reset shipping
        this.tax = (this.itemTotal * 0.06);
        this.cartItems.forEach(element => {
            this.shipping += (element.Quantity * 2.00);
        });
        this.shipping += 8.00; // base shipping fee
        this.totalAmount = this.itemTotal + this.tax + this.shipping;

        this.displayOrderTotals();
    }

    // Update the order totals in the DOM
    displayOrderTotals(){
        const totalElement = document.getElementById("order-total-amount");
        const shippingElement = document.getElementById("order-shipping-amount");
        const taxElement = document.getElementById("order-tax-amount");

        if(totalElement){
            totalElement.textContent = this.totalAmount.toFixed(2);
        }
        
        if(taxElement){
            taxElement.textContent = this.tax.toFixed(2);
        }
    
        if(shippingElement){
            shippingElement.textContent = this.shipping.toFixed(2);
        }
    }

    // Handle the checkout process by sending order data to the server
    async checkout() {
        const formElement = document.getElementById("checkout-form");

        // Validate form
        if (!formElement) return;

        //Trigger HTML2 validation check
        if (!formElement.checkValidity()) {
            formElement.reportValidity();
            return;
        }


        // Gather form data
        const order = formatDataToJSON(formElement);

        // Validate form data
        if (!order) return;
        
        order.orderDate = new Date().toISOString();
        order.totalAmount = this.totalAmount.toFixed(2).toString();
        order.shipping = this.shipping;
        order.tax = this.tax.toFixed(2).toString();
        order.items = packageItems.call(this);
        // I decided to keep this console log for debugging purposes
        // It helps to see the final order object before sending it
        // Feel free to remove it if not needed
        console.log(order);

        // Send order to server
        try {
            const response = await externalServices.checkout(order);
            // I decided to keep this console log for debugging purposes
            // It helps to confirm the response from the server
            // Feel free to remove it if not needed
            console.log("Checkout successful:", response);
            setLocalStorage("so-cart", []);
            // redirect to success page
            window.location.href = "./success.html";
        } catch (error) {
            console.error("Checkout failed:", error);
            alertMessage(
                error.messages || [error.message] || ["There was an issue processing your order. Please try again."]
            );
            }
    }
}
