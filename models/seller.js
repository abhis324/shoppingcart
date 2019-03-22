const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  category : {type: String, required: true}
})

const SellerSchema = new Schema({
  //sellerID : {type: String, required: true},
  sellerName: {type: String, required: true},
  sellermail : {type: String, required: true},
  sellerCategory: [CategorySchema]
})

const Seller = mongoose.model('seller', SellerSchema)

module.exports = Seller
