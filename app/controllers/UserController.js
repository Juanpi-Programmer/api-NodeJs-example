const User = require('../model/User');
const bcrypt = require('bcrypt-nodejs');

const index = (req, res) => {
    User.find({})
    .then(users => {
        if(users.length) return res.status(200).send({users})
        return res.status(204).send({message: 'NO CONTENT'})
    }).catch(err => res.status(500).send({err}))
}

const show = (req, res) => {
    if(req.body.users) return res.status(500).send({error});
    if(!req.body.users) return res.status(404).send({message: 'NOT FOUND'});
    let users = req.body.users;
    return res.status(200).send({users});
}

const create = (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, null, (err, hash) => {
            req.body.password = hash;
            new User(req.body).save().then(users => res.status(200).send({users})).catch(err => res.status(500).send(err));
        });
    });
}

const update = (req, res) => {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.users) return res.status(404).send({message: 'NOT FOUND'});
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, null, (err, hash) => {
            req.body.password = hash;
            let user = req.body.users[0];
            user = Object.assign(user, req.body);
            user.save().then(users => res.status(200).send({message: 'Update', users})).catch(error => res.status(500).send({error}));
        });
    });
}

const remove = (req, res) => {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.users) return res.status(404).send({message: 'NOT FOUND'});
    req.body.users[0].remove().then(users => res.status(200).send({message: 'Remove', users})).catch(error => res.status(500).send(error))
}

const find = (req, res, next) => {
    let query = {};
    query[req.params.key] = req.params.value;
    console.log(query);
    User.find(query).then(users => {
        if(!users.length) return next()
        req.body.users = users;
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