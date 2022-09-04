require("dotenv").config({ path: ".env" });
const path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
const models = require("./bank-models");

const Account = models.Account;


const Transaction = models.Transaction;

var app = express();

// for parsing application/json
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: true });




async function saveTransactionData(sender, reciever, balance) {
  const senderNo = sender.accountNo;
  const recieverNo = reciever.accountNo;
  const tId = String(Date.now());
  const transaction = new Transaction({
    senderNo,
    recieverNo,
    transactionAmount: balance,
    tId,
    transactionAt: new Date().toISOString(),
  });
  await transaction.save();
  return tId;
}

async function handleTransaction(senderNo, recieverNo, balance) {
  if (senderNo === recieverNo) {
    throw new Error("Error!");
  }
  const sender = await Account.findOne({ accountNo: senderNo });

  const reciever = await Account.findOne({
    accountNo: recieverNo,
  });

  if (!sender || !reciever) {
    throw new Error("Error!");
  }
  const sBalance = sender.balance - balance;
  const rBalance = reciever.balance + balance;
  if (sBalance < 0) {
    throw new Error("Error!");
  }

  // https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/
  await Account.updateOne(
    { accountNo: senderNo },
    { $set: { balance: sBalance } },
    { upsert: true }
  );
  await Account.updateOne(
    { accountNo: recieverNo },
    { $set: { balance: rBalance } },
    { upsert: true }
  );
  const tId = await saveTransactionData(
    sender,
    reciever,
    balance
  );
  return tId;
}


app.get(`/ac/:ac`, (req, res) => {
  Account.findOne({ ac: req.params.ac }, (err, ac) => {

    return res.json({ ac: ac });
  });
});

app.post(`/ac/create-ac`, urlencodedParser, (req, res) => {
  const { ac, name, address, balance, email } = req.body;

  const _ac = new Account({
    ac,
    name,
    balance,
    address,
    email,
  });
  _ac.save(function (err) {

    res.send("Success!");
  });
});

app.post(
  `/transaction`,
  urlencodedParser,
  async (req, res) => {
    const { senderNo, receiverNo, balance } = req.body;

    const tId = await handleTransaction(
      senderNo,
      receiverNo,
      parseFloat(balance)
    );
    res.json({
      tId,
    });

  }
);

app.listen(4002);
