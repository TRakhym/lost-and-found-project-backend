const prisma = require("../../lib/prisma");

async function get_my_items(request, response) {
  try {
   const items = await prisma.item.findMany({
      where: { userId: request.userId},
      orderBy: { 
        createdAt: 'desc'
      },
      include: {
         photos: true
      }
   })
   response.json(items)
  } catch (error) {
    console.log("Items - Get My Items:", error);
    response.status(500)
  }
}

module.exports = get_my_items;
