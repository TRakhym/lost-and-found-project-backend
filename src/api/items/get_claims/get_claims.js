const prisma = require("../../lib/prisma");

async function get_claims(request, response){
    try{
        const idNumber = Number(request.params.id)
        if(isNaN(idNumber)){
            return response.status(400).json({
                error: "Id is wrong"
            })
        }

        const item = await prisma.item.findUnique({
            where: { id: idNumber}
        })

        if(!item){
            return response.status(400).json({
                error: "There's not such item"
            })
        }

        if(item.userId !== request.userId){
            return response.status(403).json({
                error: "It's not your item"
            })
        }

        const claims = await prisma.claim.findMany({
            where: {
                itemId: idNumber
            },
            include: {
                user: {
                    select: { 
                        name: true, 
                        email: true, 
                        avatarUrl: true
                    }
                }
            }
        })

        response.json(claims)
    }catch(error){
        console.log('Items - get Claim:', error)
        response.status(500)
    }
}

module.exports = get_claims;