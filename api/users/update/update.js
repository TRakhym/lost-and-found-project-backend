const prisma = require('../../lib/prisma');
const cloudinary = require('../../lib/cloudinary')
const fs = require('fs')

async function updateProfile(request, response){
    try {
        const userId = request.userId
        const { name, phone } = request.body

        const updateData = {}

        if (name) updateData.name = name
        if (phone) updateData.phone = phone

        if (request.file) {
            const uploadResult = await cloudinary.uploader.upload(request.file.path, {
                folder: 'lostfound/avatars',
                public_id: `user_${userId}`,
                overwrite: true,
                invalidate: true,
                transformation: [{ width: 400, height: 400, crop: 'fill' }]
            })

            updateData.avatarUrl = uploadResult.secure_url

            fs.unlink(request.file.path, () => {})
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
        console.error(error)
        response.status(500).json({ error: 'Something went wrong during update' })
    }
}

module.exports = updateProfile