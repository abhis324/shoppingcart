var express = require('express');
var router = express.Router();
var passport = require('passport')
var app = express()

var Product = require('../models/product')

router.get('/', (req,res)=> {
  if (req.session.cart){
  //console.log(req.session.cart)
  var x = req.session.cart;
  var prods = [];
  var totalPrice = 0;
  //res.send("fd")
  async function g(){
    try{
    var a = 0;
    let promise = new Promise(resolve=>{
      //for (var i = 0 ; i < 12900000000; ++i){a+=1;}
      for (var i = 0 ; i < x.length ; ++i)
      {
        // if (i == x.length-1)
        // {return resolve(1)};
        //req.session.cart.find(obj => obj._id == result._id.toString())
        Product.findOne({_id: x[i].cartproductid}).then(function(result){
          var prodobj = {
            id: result._id.toString(),
            imagePath: result.imagePath,
            productName: result.productName,
            productDescription: result.productDescription,
            price: result.price,
            category: result.category,
            quantity: req.session.cart.find(obj => obj.cartproductid == result._id.toString()).quantity
          }
          var str = result._id.toString();
          //console.log(req.session.cart, "x[i] h");
          // console.log('\nwow\n')
          // console.log(prodobj, "result h\n");
          // console.log(req.session.cart.find(obj => obj.cartproductid === str), str);
          //console.log(req.session.cart.find(obj => obj._id == result._id.toString()))
          prods.push(prodobj)
          //console.log(result+" this one " , prods)
          if (prods.length == x.length)
          {return resolve(1)};
        })
      }
    })
    return promise
  }catch(err){console.log(err);error(err)}}
//   var promise1 = g().resolve(1)
//   promise1.then(function(value) {
//   console.log(value);
//   res.send(value);
//   //expected output: 123
// });
// g().then(function(result){console.log("done")})
g().then((val) => { console.log("fulfilled:", val, prods.length) ;
  if (req.session.passport)
  { console.log(req.session.totalCount);
    res.render('pages/cart', {user: req.session.passport.username, totalPrice: req.session.totalCount , products: prods} ); }
  else{
    res.render('pages/cart', {user: "User", totalPrice: req.session.totalCount , products: prods});
  }},
       (err) => console.log("rejected: ", err));
//res.send("fsld")
//   g().then((result)=>{resolve(prods);console.log("fdf")});
// //   async function f(){
// //     try{var a = 0;
// //       g().then((result)=>{console.log(t + " fefe")})
// // }catch(err){
// //   error(err);
// // }}
// g().then((result)=>{console.log(result+ " fefe")})
  // f().then((result)=>{console.log(prods.length + "here is the prods");res.send(prods)})
}
  else {
    res.send("You have no products in cart..try adding some and come back and se")
  }
  // }
  // await displayed()
  // console.log(23+23)
  // //console.log(prods.length)
  // //req.session.destroy(function(err){ if(err) throw err;})
  // res.send("hello world");
})

router.get('/now',async (req,res) => {
  console.log(req.session.cart[0].cartproductid)
  let promise = new Promise(function(resolve,reject){
    Product.findOne({_id: req.session.cart[0].cartproductid}).then(function(result){
      console.log(result+" this one ")
      if (req.session.cart.length == 1)
      {return resolve(1)};
    })
  })
  promise.then(function(result){res.send("good")})
})
module.exports = router
