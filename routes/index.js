var express = require('express');
var router = express.Router();
var path = require('path')
var app = express()
var mongoose = require('mongoose')
var async = require('async')
var Product = require('../models/product')

// process.env.PWD = process.cwd()

//app.use(express.static(__dirname + 'uploads'));

//app.use('/static', express.static(path.join(__dirname, 'uploads')))

/* GET home page. */

//var products = []

router.get('/', function(req, res, next) {
  var products;
  //res.send("helloe")
  async function findProds()
  {
    await Product.find({}, function(err, docs) {
    if (!err){
        //console.log(docs);
        products = docs;
        req.session.views = products.length;
        console.log(req.session)
        // process.exit()
    } else {throw err;}
});
}
  findProds().then(function(result,err){
    //res.send(products)
    res.render('pages/index', {user: "User", products: products});
  })
  // async function found(){
  //   let promise = await Product.
  // }

});

module.exports = router;
