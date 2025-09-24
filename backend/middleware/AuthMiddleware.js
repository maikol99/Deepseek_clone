const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next) => {
    const token = req?.cookies?.auth_token;
    console.log(token)
    if(!token){
        return res.status(401).json({error:"No token, authorization denied"})
    }

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode)
        req.user = decode;
        next();
    }catch(error){
        res.status(401).json({error:'token is not valid'})
    }
}

module.exports = authMiddleware;