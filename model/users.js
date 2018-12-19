
const mongoose = require('mongoose');

var schema = new mongoose.Schema(
    { email : "String",
      password : "String" })

var User = mongoose.model('User', schema)

module.exports = User;


