const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  genre: { type: String, required: true },
  isAdmin: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
