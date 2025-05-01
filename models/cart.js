const Product = require('./Product');

class Cart {
  static #items = [];

  static add(productName, quantity = 1) {
    const product = Product.findByName(productName);
    if (!product) throw new Error(`Product "${productName}" not found`);
    const item = this.#items.find(i => i.product.name === productName);
    if (item) item.quantity += quantity;
    else this.#items.push({ product, quantity });
  }

  static getItems() {
    return this.#items;
  }

  static getTotalPrice() {
    return this.#items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }

  static getProductsQuantity() {
    return this.#items.reduce((sum, i) => sum + i.quantity, 0);
  }

  static clearCart() {
    this.#items = [];
  }
}

module.exports = Cart;
