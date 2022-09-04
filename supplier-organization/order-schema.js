const mongoose = require("mongoose");
const ps = require("./product-schema");

module.exports = new mongoose.Schema({
  products: [{ product: ps, count: "number" }],
  address: {
    "country":"string",
    "city":"string",
    "house":"string",
  },
  tId: "string",
  amount: "number",
});