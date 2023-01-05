const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorieSchema = Schema({
  name: { type: String, require: true },
  productsId: { type: Array[String], require: true },
});

const Categorie = mongoose.model("Categorie", categorieSchema);

module.exports = Categorie;