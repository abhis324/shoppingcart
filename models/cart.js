const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const CartSchema = new Schema({
  cartproductid: {type:String, required: true},
  productName: {type: String, required: true},
  productDescription: {type: String, required: true},
  price: {type: Number, required: true},
  category: {type: String, required: true},
  quantity: {type: Number, required: true}
})

const Cart = mongoose.model('cart', CartSchema)

module.exports = Cart
