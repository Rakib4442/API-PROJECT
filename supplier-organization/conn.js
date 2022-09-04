const mongoose = require("mongoose");
const ps = require("./product-schema");
const os = require("./order-schema");

module.exports = function connectionFactory() {
  const conn = mongoose.createConnection(process.env.MONGODB_URI);
  conn.model("Order", os);
  conn.model("Product", ps);
  return conn;
};