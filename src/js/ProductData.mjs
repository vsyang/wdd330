const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  // if (res.ok) {
  //   return res.json();
  // } else {
  //     throw new Error("Bad Response");
  // }
  let jsonInfo = null;
  try {
    jsonInfo = await res.json();
  } catch {
    jsonInfo = { message: res.statusText || "Bad Response" };
  }

  if (res.ok) {
    return jsonInfo;
  }

  throw { name: "servicesError", message: jsonResponse };
}

export default class ProductData {
  constructor() {}

  async getData(category) {
      const response = await fetch(`${baseURL}products/search/${category}`);
      const data = await convertToJson(response);
      return data.Result;
    } 
  
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}

export class ExternalServices {
  async checkout(order) {
    const url = `${baseURL}/checkout`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    });
    return convertToJson(res);
  }
}