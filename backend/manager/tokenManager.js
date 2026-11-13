const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET;

class TokenManager{
    
    verifyJWTCookie = (req, res, next) =>{        
        const token = req.cookies["access-token"];                 
        if(!token) return res.status(401).json({auth: false , mensagem: "Token não foi recebido"});
            jwt.verify(token, secret, (err, decoded) =>{
            if(err) return res.status(500).json({auth: false, mensagem: "tokem expirou"});
            req.userId = decoded.id;                    
            next()
        })
           
    }
    
    sign = (id) => {return jwt.sign({id}, secret, {expiresIn: "3h"});};    
}

module.exports = new TokenManager()


