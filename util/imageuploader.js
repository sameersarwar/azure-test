const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.AZURE_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.AZURE_CLOUDINARY_API_KEY,
    api_secret: process.env.AZURE_CLOUDINARY_API_SECRET,
})

const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath)
        return result.secure_url
    } catch (error) {
        throw error
    }
}

module.exports = uploadImage
