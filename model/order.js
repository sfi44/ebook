
const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = new mongoose.Schema(
    { 
        product: {type : ObjectId, ref : 'Product'}, 
        user: {type : ObjectId, ref : 'User'}, 
        order_date : { type: Date, default: Date.now },
        price: Number
    })

var Order = mongoose.model('Order', schema)

module.exports = Order;