const JWT = require('jsonwebtoken')
const prisma = require('../../lib/prisma');
const bcrypt = require('bcryptjs');

async function register(request, response){
    try{
        const { email, password, name } = request.body;

        const reliability = reliabilityCheck(password)
        if (reliability) {
            return res.status(400).json({ message: passwordError })
        }

        const cryptedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
                data: {
                    email,
                    password: cryptedPassword,
                    name
                }
            });

        const token = JWT.sign(
            { id: user.id },
            process.env.JWT_SECRET, 
            { expiresIn: '1h'}
        );
        
        response.json({
            token,
            user: { id: user.id, email: user.email, name: user.name }
        });
    } catch(error){
        response.status(409).json({ error: 'User already exists' });
    }
};

function reliabilityCheck(yourPassword){
    if(!password || password.length < 8){
        return 'Password should have at least 8 symbols'
    }
    if(!/[A-Z]/.test(password)){
        return 'Password should have at least one upper letter'
    }
    if(!/[a-z]/.test(password)){
        return 'Password should have at least one lower letter'
    }
    if(!/\d/.test(password)){
        return 'Password should have at least one digit'
    }
    return null
}

module.exports = register;