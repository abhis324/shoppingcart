const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProductSchema = new Schema({
  imagePath: {type: String, required: true},
  //productID: {type: String, required: true},
  productName: {type: String, required: true},
  productDescription: {type: String, required: true},
  price: {type: Number, required: true},
  availability: {type: Number, required: true},
})

const Product = mongoose.model('product', ProductSchema)

module.exports = Product
