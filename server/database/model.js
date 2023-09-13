const mongoose = require("mongoose");
const users = new mongoose.Schema({
    Name: String,
    password: String,
    email: String
});
module.exports = {
    User: mongoose.model("User", users),
}