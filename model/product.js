
const mongoose = require('mongoose');

var schema = new mongoose.Schema(
    { id: String, 
    name: String, 
    description: String, 
    USD_price: Number, 
    EUR_price: Number, 
    file_link: String, 
    creation_date: String, 
    orders_counter: Number })

var Product = mongoose.model('Product', schema)

module.exports = Product;


