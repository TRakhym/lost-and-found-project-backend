const JWT = require('jsonwebtoken')

async function shield(req, res, next){
    let token

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return res.status(401).json({ message:'No token - Access is denied'})
    }

    try {
        const rezult = JWT.verify(token, process.env.JWT_SECRET);
        req.userId = rezult.id;
        next()
    }catch(err){
        return res.status(401).json({ message:'Token is expired'})
    }
}

module.exports = { shield }