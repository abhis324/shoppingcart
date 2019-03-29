var express = require('express');
var router = express.Router();
var path = require('path')
var app = express()
var mongoose = require('mongoose')
var async = require('async')
var passport = require('passport')
var Product = require('../models/product')

router.get('/ordered', (req,res)=>{
  res.redirect('/')
  req.session.destroy(function(err,result){
    if (err) throw err;
  })
})

async function findProds()
{
  let promise = Product.find({}, function(err, docs) {
  if (!err){
      return docs
  }
  else{throw err}
});
  await promise
  //console.log("ok now it is done");
  return promise;
}

async function findSpecifics(products)
{
  let promise = new Promise(function(resolve,reject){

    var obj = { eatables:[], electronics:[], books:[], clothes:[] };
    //console.log(products.filter(product => product.category == 'electronics'));
    obj.books = products.filter(obj => obj.category == 'books');
    obj.electronics = products.filter(obj => obj.category == 'electronics');
    obj.clothes = products.filter(obj => obj.category == 'clothes');
    obj.eatables = products.filter(obj => obj.category == 'eatables');
    console.log(obj.electronics)
    resolve(obj);

  })
  await promise
  return promise
}

router.get('/', async function(req, res, next) {

    let products = await findProds();
    let eatables = await findSpecifics(products);
    console.log("here is the eatables ", eatables);
    if (req.session.passport)
    {
      console.log(req.session.passport.user)
        res.render('pages/index', {user: req.session.passport.user.username, products: eatables});
    }
    else {
      console.log("no passport")
      res.render('pages/index', {user: "User", products: eatables});
    }

});

module.exports = router;
