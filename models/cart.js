const Product = require('./Product');

class Cart {
  static #items = [];

  static add(productName, quantity) {
    const product = Product.findByName(productName);
    if (!product) {
      throw new Error(`Produkt o nazwie "${productName}" nie istnieje.`);
    }

    const existingItem = this.#items.find(item => item.product.name === productName);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.#items.push({ product, quantity });
    }
  }

  static getItems() {
    return this.#items;
  }

  static getTotalPrice() {
    return this.#items.reduce(
      (total, { product, quantity }) => total + product.price * quantity,
      0
    );
  }

  static getProductsQuantity() {
    return this.#items.reduce((sum, { quantity }) => sum + quantity, 0);
  }

  static clearCart() {
    this.#items = [];
  }
}

module.exports = Cart;
