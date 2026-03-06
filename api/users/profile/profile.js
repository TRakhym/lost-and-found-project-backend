const prisma = require('../../lib/prisma');

async function profile(request, response){
    const user = await prisma.user.findUnique({
        where: { id: request.userId },
        select: { id: true, email: true, name: true }
    })
    response.json(user)
};

module.exports = profile;