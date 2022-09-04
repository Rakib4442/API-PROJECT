const mongoose = require("mongoose");
const accountSchema = require("../bank-account");
const transactionSchema = require("./bank-schema/transaction-schema");

module.exports = function connectionFactory() {
  const conn = mongoose.createConnection(process.env.MONGODB_URI);
  conn.model("Account", accountSchema);
  conn.model("Transaction", transactionSchema);
  return conn;
};