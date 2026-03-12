const prisma = require('../../lib/prisma');

async function profile(request, response){
    const user = await prisma.user.findUnique({
        where: { id: request.userId },
        select: { email: true, name: true, phone: true, avatarUrl: true }
    })
    response.json(user)
};

module.exports = profile;