const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  orderDate: {type: Date, default: Date.now},
  customerID: {type: String, required: true},
  paid: {type: Boolean, required: true}
})

const Order = mongoose.model('order', OrderSchema)

module.exports = Order
