function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(type, jsonPath = "/json/tents.json") {
    this.type = type;
    this.jsonPath = jsonPath;
  }

  async getData() {
    try {
      const response = await fetch(this.jsonPath);
      if (!response.ok) {
        throw new Error(`Erro ao carregar dados: ${response.status}`);
      }
      const data = await response.json();

      return data.filter(product => product.type === this.type);
    } catch (err) {
      console.error("Erro em ProductData.getData:", err);
      return [];
    }
  }
}