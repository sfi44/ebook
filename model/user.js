
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let schema = new mongoose.Schema(
    { email : "String",
      password : "String"
    })

schema.plugin(passportLocalMongoose);

let User = mongoose.model('User', schema)

module.exports = User;


