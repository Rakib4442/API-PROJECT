require("dotenv").config({ path: ".env" });
var bodyParser = require("body-parser");
const path = require("path");
var express = require("express");

const { Product, Order } = require("./supplier-models");
var app = express();

// for parsing application/json
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: true });


app.get(`/products`, (req, res) => {
  Product.find({}, (err, products) => {
   
    return res.json({ products:products });
  });
});

app.get(`/product/:id`, (req, res) => {
  Product.findOne({ _id: req.params.id }, (err, product) => {
    
    return res.json({ product:product });
  });
});

app.post(`/createProduct`, urlencodedParser, (req, res) => {
  const p = new Product({
    name:req.body.name,
    price:req.body.price,
  });
  p.save(function (err) {
    res.send("Success!");
  });
});

app.post(`/createOrder`, urlencodedParser, (req, res) => {
  const o = new Order({
    products:req.body.products,
    address:req.body.address,
    tId:req.body.tId,
    amount:req.body.amount,
  });
  o.save(function (err) {
    res.send("Success!");
  });
});

app.listen(4000);