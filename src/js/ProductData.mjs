
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.jsonPath = `../json/${this.category}.json`;
  }

  async getData() {
    try {
      const response = await fetch(this.jsonPath);
      if (!response.ok) throw new Error(`Erro ao carregar dados: ${response.status}`);
      const data = await response.json();
      console.log("Produtos carregados:", data);
      return data;
    } catch (err) {
      console.error("Erro em ProductData.getData:", err);
      return [];
    }
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id == id);
  }
}