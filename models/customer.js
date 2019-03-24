const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const CustomerSchema = new Schema({
  username: {type: String, required: true},
  address1: {type: String, required: true},
  address2: {type: String, required: true},
  district: {type: String, required: true},
  state: {type: String, required: true},
  email : {type: String, required: true},
  password: {type: String, required: true},
  pincode: {type: String, required: true},
  contact: {type: String, required: true},
})
// 
// CustomerSchema.methods.validPassword = function( pwd ) {
//     CustomerSchema.findOne({username})
//     return bcrypt.compareSync(pwd,password);
// };

const Customer = mongoose.model('customer', CustomerSchema)

module.exports = Customer
