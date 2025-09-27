import { loadHeaderFooter, updateCartBadge, alertMessage,  } from "./utils.mjs";

async function initMain() {
    await loadHeaderFooter();
    updateCartBadge();
}

function displayNewCustomer() {
    const lastVisit = localStorage.getItem("lastVisit");

    if (!lastVisit) {
        alertMessage("Welcome to Sleep Outside where all your outdoor needs are in one place! Register today to stay tuned with the latest news and automatically get entered for the Happy Camper Giveaway!");
        localStorage.setItem("lastVisit", true);
    }
}

initMain();
displayNewCustomer();


