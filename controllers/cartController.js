const Product = require("../models/Product");
const Cart = require("../models/cart");
const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = (request, response) => {
  Product.add(request.body);
  const { name, quantity = 1 } = request.body;
  Cart.add(name, quantity);
  response.status(STATUS_CODE.FOUND).redirect("/products/new");
};

exports.getProductsCount = (request, response) => {
  const count = Cart.getProductsQuantity();
  response.status(STATUS_CODE.OK).json({ count });
};
