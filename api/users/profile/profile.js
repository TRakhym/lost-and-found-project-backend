const prisma = require('../../lib/prisma');

async function profile(request, response){
    try{
        const user = await prisma.user.findUnique({
            where: { id: request.userId },
            select: { 
                email: true, 
                name: true, 
                phone: true, 
                avatarUrl: true 
            }
        })
        response.json(user)
    }catch(error){
        console.log('Users - Profile:', error)
        response.status(500)
    }
};

module.exports = profile;