const express = require('express');
const bodyParser = require('body-parser');

const App = express();
const Product = require('./routes/product');
const User = require('./routes/user');
const Auth = require('./routes/auth');

const AuthToken = require('./middleware/AuthToken');

//middlewares
App.use(AuthToken);
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended: false}));

//CORS
App.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Routes
App.use('/product', Product);
App.use('/user', User);
App.use('/auth', Auth);


module.exports = App;