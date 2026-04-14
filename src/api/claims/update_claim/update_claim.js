const prisma = require("../../lib/prisma");

async function update_claim(request, response){
    try{
        const idNumber = Number(request.params.id);
        const status = request.body.status
        const userId = request.userId

        if (isNaN(idNumber)) {
            return response.status(400).json({
                error: "Id is incorrect"
            });
        }

        if (status !== 'ACCEPTED' && status !== 'REJECTED') {
            return response.status(400).json({ 
                error: 'status should be ACCEPTED or REJECTED'
            })
        }

        const claim = await prisma.claim.findUnique({
            where: { id: idNumber },
            include: { item: true }
        })

        if (!claim) {
            return response.status(404).json({ 
                error: 'claim not found'
            })
        }

        if (claim.item.userId !== userId) {
            return response.status(403).json({ 
                error: "You're not owner"
            })
        }

        const updatedClaim = await prisma.claim.update({
            where: { id: idNumber },
            data: { 
                status: status
            }
        })

        response.json({ id: updatedClaim.id, status: updatedClaim.status })
    }catch(error){
        console.log('Claims - Update Claim:', error)
        response.status(500)
    }
}

module.exports = update_claim;