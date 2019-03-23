const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProductSchema = new Schema({
  imagePath: {type: String, required: true},
  imageType: {type: String, required: true},
  productID: {type: String, required: true},
  productName: {type: String, required: true},
  productDescription: {type: String, required: true},
  price: {type: Number, required: true},
  quantity : {type: Number, required: true},
  category: {type: String, required: true},
  availability: {type: Boolean}
})

const Product = mongoose.model('product', ProductSchema)

module.exports = Product
