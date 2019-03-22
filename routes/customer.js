var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Customer = require('../models/customer')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('pages/customerlogin');
});

router.post('/login', (req,res,next) => {
  res.render('pages/index', {user: req.body.name})
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
        newCustomer = new Customer({
              name : req.body.name,
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
