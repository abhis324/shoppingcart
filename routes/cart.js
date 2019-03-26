var express = require('express');
var router = express.Router();
var passport = require('passport')
var app = express()

var Product = require('../models/product')

router.get('/', (req,res)=> {
  if (req.session.cart){
  console.log(req.session.cart)
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
        Product.findOne({_id: x[i]}).then(function(result){
          prods.push(result)
          console.log(result+" this one " , prods.length)
          totalPrice += result.price;
          if (prods.length == x.length)
          {return resolve(1)};
        })
      }
    })
    console.log(promise)
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
  {res.render('pages/cart', {user: req.session.passport.username, totalPrice: totalPrice , products: prods});}
  else{
    res.render('pages/cart', {user: "User", totalPrice: totalPrice , products: prods});
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

module.exports = router
