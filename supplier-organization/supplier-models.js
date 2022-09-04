const mongooseConFactory = require("./conn");
const mongooseCon = mongooseConFactory();
const {Order, Product} = mongooseCon.models

module.exports = {
  Order,
  Product,
};