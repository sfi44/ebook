let fs = require('fs')
let ejs = require('ejs')

let express = require('express')
let app = express()


var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user); 
      });
    }
 ));

//  app.configure(function() {
//     app.use(express.static('public'));
//     app.use(express.cookieParser());
//     app.use(express.bodyParser());
//     app.use(express.session({ secret: 'keyboard cat' }));
//     app.use(passport.initialize());
//     app.use(passport.session());
//     app.use(app.router);
//   });


//
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/database')
mongoose.connection.on('connected', function () {console.log('Mongoose default connection open to db')}) 
mongoose.connection.on('error', function (err) {console.log('Mongoose default connection error' + err)})


let productModel = require(`${__dirname}/model/product.js`)
let orderModel = require(`${__dirname}/model/order.js`)
let userModel = require(`${__dirname}/model/user.js`)

let productController = require('./controller/productController')
let orderController = require('./controller/orderController')
let userController = require('./controller/userController')

// Getion du motor de template
app.set('view engine', 'ejs');

// Gestion du routing
app.get('/', function (req, res) {
    console.log ('liste produits')
    productController.getProducts().then( (products) => {
        //let data = JSON.parse(products)
        res.render('index', {"data" : products} );
    })
})

app.get('/add/:id', async function(req, res) {
    console.log(req.params.id)
    let idProduct = req.params.id
    console.log('calling');
    var prod = await productController.orderProductById(idProduct);
    var ord  = await orderController.addOrder(prod, "5c1a6b1b545ff84de0f9a0de");   // TODO Traiter le user
    console.log(ord)
    res.send(ord)
})

app.get('/getUserOrders/:idUser', function(req, res) {
    console.log(req.params.idUser)
    let idUser = req.params.id
    orderController.getUserOrders(idUser)
       .then( (doc) => {
            console.log(doc)
            res.send(doc)
        })
})


// Lancement du serveur
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


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