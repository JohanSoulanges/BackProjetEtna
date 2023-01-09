const mongoose = require("mongoose");
const { Schema } = mongoose;

const panierSchema = Schema({
  idUser: { type: String, require: true },
  products: [
    {
      productsId: { type: String, require: true },
      quantity: { type: Number, require: true },
      price: { type: Number, require: true },
    },
  ],
  date: { type: Date, require: true },
  status: { type: Number, require: true },
});

const Panier = mongoose.model("Panier", panierSchema);

module.exports = Panier;
