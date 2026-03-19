const prisma = require("../../lib/prisma");

async function create_claim(request, response){
    try{
        const idNumber = Number(request.params.id);
        const message = request.body.message
        const userId = request.userId

        if (isNaN(idNumber)) {
            return response.status(400).json({
                error: "Id is incorrect"
            });
        }

        const item = await prisma.item.findUnique({
            where: { id: idNumber }
        });

        if (!item) {
            return response.status(400).json({
                error: "There is no such item"
            });
        }
        if(item.userId === request.userId){
            return response.status(403).json({
                error: "It's not your item"
            })
        }

        const existingClaim = await prisma.claim.findFirst({
            where: { 
                itemId: idNumber,
                userId: userId
            }
        })

        if (existingClaim) {
            return response.status(409).json({
                error: 'You already claim this'
            })
        }

        const newClaim = await prisma.claim.create({
            data: {
                itemId: idNumber,
                userId: userId,
                message: message || null,
                status: 'PENDING'
            }
        })

        response.json({claimId: newClaim.id })
    }catch(error){
        console.log('Items - Create Claim:', error)
        response.status(500)
    }
}

module.exports = create_claim;