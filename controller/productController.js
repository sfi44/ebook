let productModel = require(`${__dirname}/model/product.js`);

let ProductController = 
 {
    getProducts = function () {
        return new Promise( (resolve, reject) => {
            productModel.find({},  (err, docs) => {
                if (err) { reject('Erreur')}
                else {resolve(docs) };
            })
        })
    },
    
    orderProductById = function (searchId) {
        //let contentPackage = []
    
        return new Promise(function (resolve, reject) {
            productModel.findOneAndUpdate({_id : searchId}, {$inc:{orders_counter :1}} ,  (err,doc) => {
                    if (err) { reject('Erreur')}
                    else { resolve(doc) };
            })
        })
    }

}

module.exports = ProductController;