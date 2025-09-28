const baseURL = import.meta.env.VITE_SERVER_URL;

// Helper function to convert fetch response to JSON or throw error
async function convertToJson(res) {
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    let messages;
    if (typeof data === "object" && !Array.isArray(data)) {
      // Convert {"cardNumber":"Invalid", "expiration":"Invalid"} 
      // into ["Invalid", "Invalid"]
      messages = Object.values(data);
    } else {
      messages = [data.message || data.error || JSON.stringify(data)];
    }

    throw {
      name: "servicesError",
      messages
    };
  }
}

export default class ExternalServices {
  constructor() {}

  // Fetch products by category
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  // Fetch product details by ID
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  // Submit checkout order
  async checkout(order) {
    const response = await fetch(`${baseURL}checkout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    });
    const data = await convertToJson(response);
    return data;
  }
}