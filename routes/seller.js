var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Seller = require('../models/seller')

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('pages/sellerlogin');
});

router.post('/login', (req,res,next) => {
  res.render('pages/seller', {user: req.body.name});
})

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
    })})

module.exports = router;
