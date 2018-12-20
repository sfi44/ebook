//==== PRODUCTS

// function getProducts() {
//     return new Promise( (resolve, reject) => {
//         productModel.find({},  (err, docs) => {
//             if (err) { reject('Erreur')}
//             else {resolve(docs) };
//         })
//     })
// }

// function orderProductById(searchId) {
//     //let contentPackage = []

//     return new Promise(function (resolve, reject) {
//         productModel.findOneAndUpdate({_id : searchId}, {$inc:{orders_counter :1}} ,  (err,doc) => {
//                 if (err) { reject('Erreur')}
//                 else { resolve(doc) };
//         })
//     })
// }


//==== ORDER





// function addOrder(productId, userId) {

//     //let data = { id: "3", name: "Produit 3", description: "produit 3", USD_price: 14, EUR_price: 14, file_link: 'file 3', creation_date: "12/12/2018", orders_counter: 14}
//     let new_order = {
//         product : productId, 
//         user : userId,  
//         price : 333   // TODO FIND POUR RECUP DU PRODUIT
//     }
//     return new Promise( (resolve, reject) => {
//         orderModel.create(new_order,(err, ord) => {
//             if (err) {
//                 console.log('erreur create');
//                  reject('Erreur commande')
//             }
//             else {
//                 console.log(ord)
//                 resolve(ord)
//             }
//         });
//     })     
// }

// function getUserOrders(aUserId) {
//     return new Promise( (resolve, reject) => {
//         orderModel.find({user: aUserId},  (err, docs) => {
//             if (err) { reject('Erreur')}
//             else {resolve(docs) };
//         })
//     })
// }


// function AddOneUserInCollection () {
//     let data = { email : "sf44@email.com", password : ""}
//     userModel.create(data,(err,user) => {
//         if (err) {console.log('erreur create')}
//         else console.log('user', user)
//     });     
// }

//AddOneUserInCollection()

// function AddOneProductInCollection (data) {
//     //let data = { id: "3", name: "Produit 3", description: "produit 3", USD_price: 14, EUR_price: 14, file_link: 'file 3', creation_date: "12/12/2018", orders_counter: 14}
//     var prod = productModel.create(data,(err) => {
//         if (err) {console.log('erreur create')}
//     });     
// }


// orderProductById(req.params.id, function (doc) {
//     console.log(doc)
//     res.send(doc);
// });

// let readline = require('readline');
// var rl = readline.createInterface(
// {
//      input: process.stdin, 
//      output: process.stdout, 
//      terminal: false
// });

// rl.on('line', function (line) {                       
//     if (line.indexOf('toto') != -1) {
//         let mots = line.split(' '); 
//         nb = mots[1]
//         console.log(nb)
//         orderProductById(nb)
//     }
// })

    // In file JSON
    // fs.readFile(`${__dirname}/product.json`, 'utf8', (err,file) => {
    //     if (err) throw err;
    //     callback(file)
    // })
//}

// function getAllProducts() {
//     let contentPackage = []

//     readProducts(displayProducts)
//     // fs.readFile(`${__dirname}/product.json`, 'utf8', (err,file) => {
//     //     if (err) throw err

//     //     contentPackage = file
//     //     console.log('Bienvenue. Voici les produits disponibles :')
//     //     let lstprod = JSON.parse(contentPackage)
//     //     lstprod.forEach(product => {
//     //         console.log(`[${product.id}]-[${product.name}] / [${product.EUR_price}] / [${product.orders_counter}]`);
//     //     })
//     // })
// }

// function displayProducts(products) {
//     console.log('Bienvenue. Voici les produits disponibles :')

//     //let lstprod = JSON.parse(products)
//     products.forEach(product => {
//         console.log(`[${product.id}]-[${product.name}] / [${product.EUR_price}] / [${product.orders_counter}]`);
//     })
// }

    // productModel.findOneAndUpdate({id : searchId}, {$inc:{orders_counter :1}} ,  (err,doc) => {
    //     if (err) {console.log('erreur')}
    //     else callback(doc);
    // })


    // readFileProducts(displayProducts)

    // fs.readFile(`${__dirname}/product.json`, 'utf8', (err,file) => {
    //     contentPackage = file
    //     let products = JSON.parse(contentPackage)

    //     // Trouver l'element d'id id 
    //     let product = products.find( product => {
    //         return product.id == searchId;
    //     });

    //     product.orders_counter++;

    //     productsSt = JSON.stringify(products);

    //      fs.writeFile(`${__dirname}/product.json`, productsSt, (err) => {
    //             if (err) throw err;
    //             console.log(`Commande terminée : voici votre fichier : [${product.file_link}]`);
    //     });
    // })


// loadProductCollection();
//getAllProducts();

//orderProductById("3", function(doc) {console.log(doc) }) 