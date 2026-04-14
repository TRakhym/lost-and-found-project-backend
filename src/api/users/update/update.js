const prisma = require('../../lib/prisma');
const cloudinary = require('../../lib/cloudinary')

async function updateProfile(request, response){
    try {
        const userId = request.userId
        const { name, phone } = request.body

        const updateData = {}

        if (name){
            updateData.name = name
        }
        if (phone){
            updateData.phone = phone
        }

        if (request.file) {
            const uploadResult = await new Promise((ok, bad) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: 'lostfound/avatars',
                        public_id: `user_${userId}`,
                        overwrite: true,
                        invalidate: true,
                        transformation: [
                            { 
                                width: 400,
                                height: 400,
                                crop: 'fill'
                            }
                        ]
                    },
                    (err, res) => err ? bad(err) : ok(res)
                ).end(request.file.buffer)
            })

            updateData.avatarUrl = uploadResult.secure_url
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                email: true,
                name: true,
                phone: true,
                avatarUrl: true
            }
        })

        response.json(updatedUser)
    } catch (error) {
        console.log("Users - Update:", error)
        response.status(500)
    }
}

module.exports = updateProfile