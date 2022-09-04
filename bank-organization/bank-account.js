
const mongoose = require("mongoose");
module.exports = new mongoose.Schema({
  ac: "string",
  name: "string",
  balance: "number",
  email: "string",
});