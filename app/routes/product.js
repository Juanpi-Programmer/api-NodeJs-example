const express = require('express');
const ProductCtrl = require('../controllers/ProductController');
const path = '/:key/:value';
const Router = express.Router();

Router.get('/',ProductCtrl.index) //api.com/product/
      .post('/',ProductCtrl.create)   //api.com/product/
      .get(path,ProductCtrl.find,ProductCtrl.show)    //api.com/product/category/hOGAR
      .put(path,ProductCtrl.find,ProductCtrl.update)     //api.com/product/name/SamsungGalaxi
      .delete(path,ProductCtrl.find,ProductCtrl.remove)   //api.com/product/name/SamsunGalaxy

module.exports = Router;