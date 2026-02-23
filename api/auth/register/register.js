const prisma = require('../../lib/prisma');
const bcrypt = require('bcryptjs');

async function register(request, response){
    try{
        const { email, password } = request.body;

        const cryptedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
                data: {
                    email,
                    password: cryptedPassword
                }
            });
        
        response.json({ message: 'User registered successfully' });
    } catch(error){
        response.status(409).json({ error: 'User already exists' });
    }
};

module.exports = register;