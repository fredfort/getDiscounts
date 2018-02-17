const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
  'description': String,
  'quantity': Number,
  'description': String,
  'active': Boolean,
});

module.exports = mongoose.model('products', productsSchema);
