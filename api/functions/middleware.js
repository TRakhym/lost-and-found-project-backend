const JWT = require('jsonwebtoken')

async function shield(request, response, next){
    let token

    if(
        request.headers.authorization &&
        request.headers.authorization.startsWith('Bearer ')
    ){
        token = request.headers.authorization.split(' ')[1]
    }

    if(!token){
        return response.status(401).json({ message: 'No token - Access is denied'})
    }

    try {
        const res = jwt.verify(token, process.env.JWT)
        res.userId = res.id
        next()
    }catch(err){
        return response.status(401).json({ message: 'Token is expired'})
    }
} 