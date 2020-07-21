const User = require('../model/User');
const bcrypt = require('bcrypt-nodejs');
const CONFIG = require('../config/config');

const jwt = require('jsonwebtoken');
const { use } = require('../routes/auth');

//Username
//Password

const login = (req, res) => {
    let password = req.body.password;
    let username = req.body.username;

    User.findOne({username: username}).then(user => {
        if(!user) return res.status(404).send({message: 'NOT FOUND'});
        console.log(user.password);
        bcrypt.compare(password, user.password, (err, access) => {
            console.log(access + err);
            if(access){
                payload = {
                    username: user.username,
                    email: user.email,
                    name: user.name,
                    rol: user.rol
                }
                jwt.sign(payload, CONFIG.SECRET_TOKEN, (err, token) => {
                    if(err){
                        res.status(500).send({err});
                    }else{
                        res.status(200).send({message: 'Acceso', token});
                    }
                });
            }else{
                return res.status(200).send({message: "Password o User Incorrecto"});
            }
        });
    }).catch(error => {
        return res.status(500).send({message: error})
    });
}

module.exports = {login};