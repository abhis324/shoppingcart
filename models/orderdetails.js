const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderDetailsSchema = new Schema({
  billingDate: {type: Date, default: Date.now},
  //orderID: {type: String, required: true},
  productID: {type: String, required: true},
  price: {type: String, required: true},
  quantity: {type: Number, required: true},
  paid: {type: Boolean, required: true}
})

const OrderDetails = mongoose.model('orderdetails', OrderDetailsSchema)

module.exports = OrderDetails
