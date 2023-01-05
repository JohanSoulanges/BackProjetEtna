const mongoose = require("mongoose");
const { Schema } = mongoose;

const statsSchema = Schema({
    productId: { type: String, require: true },
    venteNb: { type: Number, require: true },
    ajoutePn: { type: Number, require: true },
    detailCheck: { type: Number, require: true },
});


const Stats = mongoose.model("Stats", statsSchema);

module.exports = Stats;