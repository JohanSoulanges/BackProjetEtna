const mongoose = require("mongoose");
const { Schema } = mongoose;

const productsSchema = Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  description: { type: String, require: true },
  userId: { type: String, require: true },
  date: { type: Date, default: Date.now },
  venteNb: { type: Number, require: true },
  ajoutePn: { type: Number, require: true },
  detailCheck: { type: Number, require: true },
  category: { type: Array, require: true },
});

const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
