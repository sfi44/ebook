let fs = require('fs')
let ejs = require('ejs')

let express = require('express')
let app = express()

app.use(express.static('public'));

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


// let productModel = require(`${__dirname}/model/product.js`)
// let orderModel = require(`${__dirname}/model/order.js`)
// let userModel = require(`${__dirname}/model/user.js`)

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
