const prisma = require('../../lib/prisma');
const cloudinary = require('../../lib/cloudinary')

async function create_item(request, response){
   try{
      const title = request.body.title
      const description = request.body.description
      const type = request.body.type
      const location = request.body.location
      const date = request.body.date
      const category = request.body.category

      if (!title) {
         return response.status(400).json({ 
            error: 'Title is required'
         })
      }
      if (!type) {
         return response.status(400).json({ 
            error: 'Type is required'
         })
      }
      if (!location) {
         return response.status(400).json({ 
            error: 'Location is required'
         })
      }
      if (!date) {
         return response.status(400).json({
            error: 'Date is required' 
         })
      }

      if (type !== 'LOST' && type !== 'FOUND') {
         return response.status(400).json({ 
            error: 'type should be "LOST" or "FOUND"' 
         })
      }

      let images = []

      if (request.files) {
         for (let i = 0; i < request.files.length; i++) {
            const file = request.files[i]

            try {
               const result = await new Promise((ok, bad) => {
                  cloudinary.uploader.upload_stream(
                     { folder: 'lost-found' },
                     (err, res) => err ? bad(err) : ok(res)
                  ).end(file.buffer)
               })

               images.push({
                  url: result.secure_url,
                  publicId: result.public_id
               })
            } catch (uploadErr) {
               console.log('Items - Create Item - Upload Error', uploadErr.message)
            }
         }
      }

      const newItem = await prisma.item.create({
         data: {
            title: title,
            description: description || null,
            type: type,
            location: location,
            date: new Date(date),
            category: category || 'Other',
            status: 'OPEN',
            userId: request.userId
         }
      })

      if (images.length > 0) {
         const photoData = images.map(photo => ({
            url: photo.url,
            publicId: photo.publicId,
            itemId: newItem.id
         }))

         await prisma.photo.createMany({ 
            data: photoData 
         })
      }

      response.json({itemId: newItem.id })
   }catch(error){
      console.log('Items - Create Item:', error)
      response.status(500)
   }
};

module.exports = create_item;