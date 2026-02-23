const prisma = require('../../lib/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

async function login(request, response){
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if(!user){
        return response.status(400).json({ error: 'Invalid credentials'})
    }

    const passwordChecking = await bcrypt.compare(password, user.password)

    if(!passwordChecking){
        return response.status(400).json({ error: 'Invalid credentials'})
    }

    const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET, 
        { expiresIn: '1h'}
    );

    response.json({ token })
}

module.exports = login;