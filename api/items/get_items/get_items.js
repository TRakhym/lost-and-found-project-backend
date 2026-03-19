const prisma = require('../../lib/prisma');

async function get_items(request, response){
   try{
    const items = await prisma.item.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            photos: true
        }
    })
    response.json(items)
   }catch(error){
    console.log('Items - Get Items:', error)
    response.status(500)
   }
};

module.exports = get_items;