export default class ProductData {
  constructor(type, jsonPath = new URL("../public/json/tents.json", import.meta.url).href) {
    this.type = type;
    this.jsonPath = jsonPath;
  }

  async getData() {
    try {
      const response = await fetch(this.jsonPath);
      if (!response.ok) throw new Error(`Error loading data: ${response.status}`);
      const data = await response.json();
      console.log("Products loaded:", data);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Error in ProductData.getData:", err);
      return [];
    }
  }

  async findProductByName(name) {
    const data = await this.getData();
    const lower = name.toLowerCase();
    return data.find(p => p.Name.toLowerCase() === lower);
  }

  async findProductById(id) {
    const data = await this.getData();
    return data.find(p => String(p.Id) === String(id));
  }
}