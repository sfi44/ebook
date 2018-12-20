const fs = require('fs')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const restify = require('express-restify-mongoose')
const express = require('express')
const router = express.Router()

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');

let app = express()

let productModel = require(`${__dirname}/model/product.js`)
// let orderModel = require(`${__dirname}/model/order.js`)
let userModel = require(`${__dirname}/model/user.js`)

app.use(express.static('public'))
app.use(methodOverride())
app.use(router)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

mongoose.connect('mongodb://localhost:27017/database')
mongoose.connection.on('connected', function () {console.log('Mongoose default connection open to db')}) 
mongoose.connection.on('error', function (err) {console.log('Mongoose default connection error' + err)})

restify.serve(router, productModel)
restify.serve(router, userModel)

let productController = require('./controller/productController')
let orderController = require('./controller/orderController')
let userController = require('./controller/userController')

// Getion du motor de template
app.set('view engine', 'ejs');

// Gestion du routing
router.get('/', function (req, res) {
  debugger;
    console.log ('liste produits')
    productController.getProducts().then( (products) => {
        //let data = JSON.parse(products)
        res.render('index', {data: products, user : req.user} );
    })
})

router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res) {
  userModel.register(new userModel({ email : req.body.email }), req.body.password, function(err, user) {
      if (err) {
          return res.render('register', { user : user });
      }

      passport.authenticate('local')(req, res, function () {
          res.redirect('/');
      });
  });
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/add/:id', async function(req, res) {
    console.log(req.params.id)
    let idProduct = req.params.id
    console.log('calling');
    var prod = await productController.orderProductById(idProduct);
    var ord  = await orderController.addOrder(prod, "5c1a6b1b545ff84de0f9a0de");   // TODO Traiter le user
    console.log(ord)
    res.send(ord)
})

router.get('/getUserOrders/:idUser', function(req, res) {
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
