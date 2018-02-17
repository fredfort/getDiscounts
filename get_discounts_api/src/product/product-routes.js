
const express = require('express');
const route = express.Router();

const ProductModel = require('./product-model');


let products = [];

// ROUTES 
route.get('/', (req, res) => {
  ProductModel.find(function (err, products) {  
    res.send(products);
  })
});

route.post('/', (req, res) => {
  const newProductDB = new ProductModel(req.body.product);
  newProductDB.save().then( (result) => {
    res.send(result);
  });
});

route.put('/', (req, res) => { const updatedProduct = req.body.product;ProductModel.findByIdAndUpdate(updatedProduct._id, updatedProduct,{ new: true}, function(err, product){res.send(product);});   
});

route.delete('/:productId', (req, res) => {
  const productId = req.params.productId;
  ProductModel.findByIdAndRemove(productId,function (err, product) {
    res.send({ productId: product.id });
  });
});

module.exports = route;