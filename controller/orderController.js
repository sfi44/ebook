let orderModel = require(`${__dirname}/model/order.js`);

let ProductController = 
 {
    getOrders : function () {
        return new Promise( (resolve, reject) => {
            orderModel.find({},  (err, ords) => {
                if (err) { reject('Erreur')}
                else {resolve(ords) };
            })
        })
    },

    getUserOrders : function (aUserId) {
        return new Promise( (resolve, reject) => {
            orderModel.find({user: aUserId},  (err, docs) => {
                if (err) { reject('Erreur')}
                else {resolve(docs) };
            })
        })
    },

    addOrder : function(productId, userId) {

        //let data = { id: "3", name: "Produit 3", description: "produit 3", USD_price: 14, EUR_price: 14, file_link: 'file 3', creation_date: "12/12/2018", orders_counter: 14}
        let new_order = {
            product : productId, 
            user : userId,  
            price : 333   // TODO FIND POUR RECUP DU PRODUIT
        }
        return new Promise( (resolve, reject) => {
            orderModel.create(new_order,(err, ord) => {
                if (err) {
                    console.log('erreur create');
                     reject('Erreur commande')
                }
                else {
                    console.log(ord)
                    resolve(ord)
                }
            });
        })     
    }

}

module.exports = OrderController;