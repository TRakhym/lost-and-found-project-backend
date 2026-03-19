const prisma = require("../../lib/prisma");

async function get_item(request, response) {
  try {
   const idNumber = Number(request.params.id)
   if(isNaN(idNumber)){
      return response.status(400).json({
         error: "Id is wrong"
      })
   }

   const item = await prisma.item.findUnique({
      where: { id: idNumber},
      include: {
         photos: true
      }
   })

   if(!item){
      return response.status(400).json({
         error: "There's not such item"
      })
   }
   
   response.json(item)
  } catch (error) {
    console.log("Items - Get Items:", error);
    response.status(500);
  }
}

module.exports = get_item;