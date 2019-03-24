var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var flash = require('connect-flash')
var app = express()
app.use(flash())
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

var Customer = require('../models/customer')
var Product = require('../models/product')

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
var productsInCart = [];
router.post('/fetchdata', (req,res)=>{
  console.log(typeof req.body.params.str)
  var s = req.body.params.str;
  productsInCart.push(s);
  res.send(s+ " added successfully")
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
