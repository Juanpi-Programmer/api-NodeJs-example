const express = require('express');
const UserCtrl = require('../controllers/UserController');
const path = '/:key/:value';
const Router = express.Router();

Router.get('/',UserCtrl.index) //api.com/product/
      .post('/',UserCtrl.create)   //api.com/product/
      .get(path,UserCtrl.find,UserCtrl.show)    //api.com/product/category/hOGAR
      .put(path,UserCtrl.find,UserCtrl.update)     //api.com/product/name/SamsungGalaxi
      .delete(path,UserCtrl.find,UserCtrl.remove)   //api.com/product/name/SamsunGalaxy

module.exports = Router;