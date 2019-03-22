const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  category : {type: String, required: true}
})

const SellerSchema = new Schema({
  //sellerID : {type: String, required: true},
  sellerName: {type: String, required: true},
  sellerMail : {type: String, required: true},
  sellerPassword: {type: String, required: true},
  sellerContact: {type: String, required: true}
  //sellerCategory: [CategorySchema]
})

const Seller = mongoose.model('seller', SellerSchema)

module.exports = Seller
