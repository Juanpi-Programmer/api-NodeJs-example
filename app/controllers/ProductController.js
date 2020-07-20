const Product = require('../model/Product');

const index = (req, res) => {
    Product.find({})
    .then(products => {
        if(products.length) return res.status(200).send({products})
        return res.status(204).send({message: 'NO CONTENT'})
    }).catch(err => res.status(500).send({err}))
}

const show = (req, res) => {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.products) return res.status(404).send({message: 'NOT FOUND'});
    let products = req.body.products;
    return res.status(200).send({products});
}

const create = (req, res) => {
    new Product(req.body).save().then(product => res.status(200).send({product})).catch(err => res.status(500).send(err));
}

const update = (req, res) => {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.products) return res.status(404).send({message: 'NOT FOUND'});
    let product = req.body.products[0];
    product = Object.assign(product, req.body);
    product.save().then(product => res.status(200).send({message: 'Update', product})).catch(error => res.status(500).send({error}));
}

const remove = (req, res) => {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.products) return res.status(404).send({message: 'NOT FOUND'});
    req.body.products[0].remove().then(product => res.status(200).send({message: 'Remove', product})).catch(error => res.status(500).send(error))
}

const find = (req, res, next) => {
    let query = {};
    query[req.params.key] = req.params.value;
    console.log(query);
    Product.find(query).then(product => {
        if(!product.length) return next()
        req.body.products = product;
        return next(); 
    }).catch(error => {
        req.body.error = error;
        console.log(error);
        next();
    });
}

module.exports = {
    index, create, show, update, remove, find
}