const mongooseConFactory = require("./conn");
const mongooseCon = mongooseConFactory();
const {Account,Transaction} = mongooseCon.models
module.exports = {
  Account,
  Transaction,
};