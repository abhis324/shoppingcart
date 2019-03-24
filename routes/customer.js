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

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("i m in")
    Customer.findOne({ username: username }, function(err, user) {
      console.log(user)
      if (err) { console.log("err region") ; return done(err); }
      if (!user) {
        console.log("user region")
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password != password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log("all done")
      req.session.username = username;
      return done(null, user);
    });
  }
));

///passportjs block

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.session.views + "dfdd")
  //console.log(passport.session)
  //console.log(mongoose.connection)
  res.render('pages/customerlogin');
});

// router.get('/login', function(err,req,res,next){
//   res.
// })
//var productsInCart = [];

String.prototype.toObjectId = function() {
var ObjectId = (require('mongoose').Types.ObjectId);
return new ObjectId(this.toString());
};

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

    let promise = await cartObj.save(function(err){
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
  async function updated()
  {
    Product.findOne({_id: req.body.params.obj.id }).then(async function (result){
        result.quantity = result.quantity - req.body.params.obj.quantity;
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

router.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/'}));

router.post('/signup', (req,res,next) => {

  bcrypt.genSalt(10, function(err, salt) {

    		bcrypt.hash(req.body.password, salt, function(err, hash) {

    				// console.log(req.body)
    				// console.log(hash)
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
        saved().then(function(result,err){
          res.render('pages/index', {user: req.body.name});
        }).catch(err => console.log("error"));
      })
    })})

module.exports = router;
