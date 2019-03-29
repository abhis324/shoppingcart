var express = require('express');
var router = express.Router();
var path = require('path')
var app = express()
var mongoose = require('mongoose')
var async = require('async')
var passport = require('passport')
var Product = require('../models/product')

// process.env.PWD = process.cwd()

//app.use(express.static(__dirname + 'uploads'));

//app.use('/static', express.static(path.join(__dirname, 'uploads')))

/* GET home page. */

//var products = []

router.get('/ordered', (req,res)=>{
  res.redirect('/')
  req.session.destroy(function(err,result){
    if (err) throw err;
  })
})

router.get('/', function(req, res, next) {
  var products;
  //console.log(mongoose.connection)
  //res.send("helloe")
  async function findProds()
  {
    await Product.find({}, function(err, docs) {
    if (!err){
        console.log(docs);
        products = docs;
        // req.session.views = products.length;
        console.log(req.session)
        //console.log(mongoose.connection)
        // process.exit()
    } else {throw err;}
});
}
  findProds().then(function(result,err){
    //res.send(products)
    // if (!passport.user)
    // {
    //     res.render('pages/index', {user: passport.user.username, products: products});
    // }
    // else {
    //req.session.destroy(function(result){console.log("destroued")})
    if (req.session.passport)
    {
      console.log(req.session.passport.user)
        res.render('pages/index', {user: req.session.passport.user.username, products: products});
    }
    else {
      console.log("no passport")
      res.render('pages/index', {user: "User", products: products});
    }
  })
  // async function found(){
  //   let promise = await Product.
  // }

});

module.exports = router;
