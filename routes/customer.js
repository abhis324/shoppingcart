var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

var Customer = require('../models/customer')
var Product = require('../models/product')
var Cart = require('../models/cart')

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())

// app.use(passport.initialize());
// app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("i m in")
    Customer.findOne({ username: username }, function(err, user) {
      //console.log(user)
      if (err) { console.log("err region") ; return done(err); }
      if (!user) {
        console.log("user region")
        return done(null, false, { message: 'Incorrect username.' });
      }
      if(bcrypt.compareSync(password, user.password) == false){
        console.log("password region")
        console.log(user.password + " " + password)
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log("all done")
      return done(null, user);
    });
  }
));

///passportjs block

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('pages/customerlogin');
});

router.post('/fetchdata', (req,res)=>{

  console.log(req.body.params.obj)

  var cartObj;

  async function saved()
  {
    cartObj = new Cart({
      cartproductid: req.body.params.obj.id,
      productName: req.body.params.obj.productName,
      productDescription: req.body.params.obj.productDescription,
      price: Number(req.body.params.obj.price),
      category: req.body.params.obj.category,
      quantity: Number(req.body.params.obj.quantity)
    })
    console.log("yelo cart" , cartObj);
    // console.log(req.session)
    let promise = new Promise(function(resolve,reject){
              console.log(req.session , " is here")
              if (req.session.cart)
              {
                if (req.session.cart.find(obj => obj.cartproductid == cartObj.cartproductid))
                {
                  req.session.cart.find(obj => obj.cartproductid == cartObj.cartproductid).quantity += cartObj.quantity;
                  req.session.totalCount += cartObj.quantity*cartObj.price;
                  req.session.save(function(err){if(err) throw err;})
                  resolve(1);
                }
                else
                {
                  req.session.cart.push(cartObj);
                  req.session.totalCount += Number(req.body.params.obj.quantity)*Number(req.body.params.obj.price);
                  console.log(req.session.totalCount)
                  console.log("ye wala " + req.session.cart)
                  req.session.save(function(err){if(err) throw err;})
                  console.log(req.session);
                  resolve(1);
                }
              }
              else {
                req.session.cart = [];
                req.session.cart.push(cartObj);
                req.session.totalCount = Number(req.body.params.obj.quantity)*Number(req.body.params.obj.price);
                console.log(req.session.totalCount)
                console.log("pehli baar")
                req.session.save(function(err){if(err) throw err;})
                console.log(req.session);
                resolve(1);
              }
              console.log("added to cart successfully "+req.session.cart)
            // }
  				})
    return promise;
  }
  async function updated()
  {
    Product.findOne({_id: req.body.params.obj.id }).then(async function (result){
        result.quantity = result.quantity - req.body.params.obj.quantity;
        req.session.totalCount += req.body.params.obj.quantity*req.body.params.obj.price;
        await result.save()
      console.log("after" + result.quantity)},
        (err)=> {throw err;})
    // await Product.findOne({_id: req.body.params.obj.id }).then((result)=>{},
    //     (err)=> {throw err;})
    // promise2.then((res)=>{
    //   return promise;
    // })
  }
  var products;
  //console.log(mongoose.connection)
  //res.send("helloe")
  async function findProds()
  {
    await Product.find({}, function(err, docs) {
    if (!err){
        console.log(docs);
        products = docs;
        req.session.views = products.length;
    } else {throw err;}
});
}
  saved().then(function(err,result){
    updated().then((res)=> { console.log("updated")})
    res.send("saved successfully");
  })
})

// router.post('/login', passport.authenticate('local'),  function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     console.log(req.body.username)
//     res.redirect('/');
//   });

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log("wow")
    if (err) { console.log("err woww ") ; return next(err); }
    if (!user) { return res.redirect('/customer'); }
    req.logIn(user, function(err) {
      if (err) {console.log("errrrr wwwww "+ err); return next(err); }
      console.log("kaha h error" + user)
      return res.redirect('/');
    });
  })(req, res, next);
});

router.post('/signup', async (req,res,next) => {

    		bcrypt.hash(req.body.password, 10, function(err, hash) {

    				console.log(hash+" signup " + req.body.password)
            var newCustomer;
        		async function saved()
            {
                // console.log(newCustomer)
                //console.log("g m h" + x + p)
                newCustomer = new Customer({
                      username : req.body.name,
                      address1: req.body.address1,
                      address2: req.body.address2,
                      district : req.body.district,
                      state : req.body.state,
                      email: req.body.email,
                      password : hash,
                      pincode: req.body.pincode,
                      contact: req.body.contact
               })

                let promise = await newCustomer.save(function(err){
        	    					if (err)
        	    						throw err
        	    					else
                        {
                          //resolve(1);
                          console.log("customer saved successfully")
                        }
        	    				})
                return promise;
            }
            var products;
            //console.log(mongoose.connection)
            //res.send("helloe")
            async function findProds()
            {
              await Product.find({}, function(err, docs) {
              if (!err){
                  console.log(docs);
                  products = docs;
              } else {throw err;}
            });
            }
                saved().then((err,result)=>{
                  findProds().then((err,result)=>{
                      console.log("products yeha h " + products)
                      // req.session.username.name = req.body.name;
                      // console.log(req.session);
                      res.redirect('/')

                      res.render('pages/index', {user: req.body.name, products: products});
                  })
                });
              })
    })

module.exports = router;
