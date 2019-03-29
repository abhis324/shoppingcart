var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose')
var async = require('async')
var multer = require('multer')
var upload = multer({dest: 'public/images/'})
var app = express();
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

//var upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/'})

var Seller = require('../models/seller')
var Product = require('../models/product')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("i m in")
    Seller.findOne({ username: username }, function(err, user) {
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


/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('pages/sellerlogin');
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log("wow")
    if (err) { console.log("err woww ") ; return next(err); }
    if (!user) { console.log("user not here"); return res.redirect('/seller'); }
    req.logIn(user, function(err) {
      if (err) {console.log("errrrr wwwww "+ err); return next(err); }
      console.log("kaha h error" + user)
      return res.redirect('/seller/upload');
    });
  })(req, res, next);
});

router.post('/upload', upload.single('avatar'), function(req,res,next){
  console.log("give me sunshine")
  let newProduct;
  var promise = new Promise((resolve,reject) => {
    newProduct = new Product(
    {
      productName: req.body.productName,
      productDescription: req.body.prodDesc,
      productID: req.body.prodID,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
      imagePath: req.file.filename,
      imageType: req.file.mimetype.split('/')[1]
    })
    resolve(1)
  })
  async function saved()
  {
    await promise;
    console.log(newProduct)
    let promise2 =  await newProduct.save(function(err,result){
      if (err) throw err;
      else console.log(newProduct + " saved successfully");
    })
    return promise2;
  }
  var products;
  //res.send("helloe")
  async function findProds()
  {
    await Product.find({}, function(err, docs) {
    if (!err){
        console.log(docs);
        products = docs;
        // process.exit()
    } else {throw err;}
});
}

  saved().then(function(err,result){
    console.log("wow");
  }).then(function(result,err){
    findProds().then(function(result,err){
      res.render('pages/seller', {user: req.body.name});
      //res.render('pages/index', {user: "User", products: products});
    })
  })
  // console.log(req.body)
})

router.post('/signup', (req,res,next) => {

  bcrypt.hash(req.body.password, 10, function(err, hash) {

      console.log(hash+" signup " + req.body.password)
      var newSeller;
      async function saved()
      {
          // console.log(newCustomer)
          //console.log("g m h" + x + p)
          newSeller = new Seller({
                sellerName : req.body.name,
                sellerMail: req.body.email,
                sellerPassword : hash,
                sellerContact: req.body.contact
         })

          let promise = await newSeller.save(function(err){
                  if (err)
                    throw err
                  else
                  {
                    //resolve(1);
                    console.log("seller saved successfully")
                  }
                })
          return promise;
      }
        saved().then(function(result,err){
          res.render('pages/seller', {user: req.body.name});
        }).catch(err => console.log("error"));
      })
  })

module.exports = router;
