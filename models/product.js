const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  sku: Number,
  title: String,
  seller: String,
  description: String,
  thumbnail_url: String,
  price: Number,
  post_date: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
