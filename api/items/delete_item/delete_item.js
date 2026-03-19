const prisma = require("../../lib/prisma");

async function delete_item(request, response) {
  try {
    const idNumber = Number(request.params.id);
    if (isNaN(idNumber)) {
      return response.status(400).json({
        error: "Id is incorrect"
      });
    }

    const item = await prisma.item.findUnique({
      where: { id: idNumber },
      select: {
        userId: true
      }
    });

    if (!item) {
      return response.status(400).json({
        error: "There is no such item"
      });
    }
    if(item.userId !== request.userId){
      return response.status(403).json({
        error: "It's not your item"
      })
    }

    await prisma.item.delete({
      where: {id: idNumber}
    })

    response.json({
      message: 'deleted'
    });
  } catch (error) {
    console.log("Items - Delete Item:", error);
    response.status(500);
  }
}

module.exports = delete_item;
