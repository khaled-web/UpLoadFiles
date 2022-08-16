//activate mongoose-package
const mongoose = require('mongoose');
//Create ProductSchema
const ProductSchema = new mongoose.Schema({
 name: {
  type: String,
  required: true
 },

 price: {
  type: Number,
  required: true
 },

 image: {
  type: String,
  required: true
 }
})

//exportingSchema
module.exports = mongoose.model('Product', ProductSchema)