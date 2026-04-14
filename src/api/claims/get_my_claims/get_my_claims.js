const prisma = require("../../lib/prisma");

async function get_my_claims(request, response){
    try{
        const userId = request.userId

        const claims = await prisma.claim.findMany({
            where: {
                userId: userId
            },
            include: {
                item: {
                    select: {
                        id: true, 
                        title: true,
                        location: true,
                        status: true
                    }
                }
            }
        })

        response.json(claims)
    }catch(error){
        console.log('Claims - Get My Claims:', error)
        response.status(500)
    }
}

module.exports = get_my_claims;