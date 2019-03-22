const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
  name: {type: String, required: true},
  address1: {type: String, required: true},
  address2: {type: String, required: true},
  district: {type: String, required: true},
  state: {type: String, required: true},
  email : {type: String, required: true},
  password: {type: String, required: true},
  pincode: {type: String, required: true},
  contact: {type: String, required: true},
})

const Customer = mongoose.model('customer', CustomerSchema)

module.exports = Customer
