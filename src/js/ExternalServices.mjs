const baseURL = import.meta.env.VITE_SERVER_URL

// Helper function to convert fetch response to JSON or throw error
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }

  if (res.ok) {
    return jsonInfo;
  }

  throw { name: "servicesError", message: jsonResponse };
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