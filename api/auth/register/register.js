const JWT = require('jsonwebtoken')
const prisma = require('../../lib/prisma');
const bcrypt = require('bcryptjs');

async function register(request, response){
    try{
        const { email, password, name } = request.body;

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

module.exports = register;