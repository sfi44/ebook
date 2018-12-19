let fs = require('fs')
let ejs = require('ejs')

//
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/database')
mongoose.connection.on('connected', function () {console.log('Mongoose default connection open to db')}) 
mongoose.connection.on('error', function (err) {console.log('Mongoose default connection error' + err)})


let productModel = require(`${__dirname}/model/product.js`);

const express = require('express')
const app = express()

// Getion du motor de template
app.set('view engine', 'ejs');

// Gestion du routing
app.get('/', function (req, res) {
    readProducts(function (products) {
        //let data = JSON.parse(products)
        res.render('index', {"data" : products} );
    })
})

app.get('/add/:id', function(req, res) {
    console.log(req.params.id);
    orderProductById(req.params.id, function (doc) {
        console.log(doc)
        res.send(doc);
    });
})

// Lancement du serveur
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


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


function AddOneProductInCollection (data) {
    //let data = { id: "3", name: "Produit 3", description: "produit 3", USD_price: 14, EUR_price: 14, file_link: 'file 3', creation_date: "12/12/2018", orders_counter: 14}
    var prod = productModel.create(data,(err) => {
        if (err) {console.log('erreur create')}
    });     
}

function readProducts(callback) {
        productModel.find({}, function (err, docs) {
            //console.log(docs)
            callback(docs)
        })

    // In file JSON
    // fs.readFile(`${__dirname}/product.json`, 'utf8', (err,file) => {
    //     if (err) throw err;
    //     callback(file)
    // })
}

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


function orderProductById(searchId ,callback) {
    let contentPackage = []

    productModel.findOneAndUpdate({id : searchId}, {$inc:{orders_counter :1}} ,  (err,doc) => {
        if (err) {console.log('erreur')}
        else callback(doc);
    })


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
}


// loadProductCollection();
//getAllProducts();

//orderProductById("3", function(doc) {console.log(doc) }) 