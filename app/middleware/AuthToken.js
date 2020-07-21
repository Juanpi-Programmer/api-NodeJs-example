const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

module.exports = (req, res, next) => {
    if(req.path != "/auth/login"){
        if(req.headers.authorization){
            let token = req.headers.authorization.split(' ')[1];
            console.log(token);
            jwt.verify(token, CONFIG.SECRET_TOKEN, (err, decoded) => {
                if(err) return res.status(500).send({message: "NO AUTHORIZATION",err});
                if(req.method != 'GET'){
                    if(decoded.rol == 'admin') next();
                    else return res.status(403).send({message: "NO AUTHORIZATION",err});
                }else return next();
                
            });
           
        }else res.status(403).send({message: 'NO AUTHORIZATION'});
    }else next();
}