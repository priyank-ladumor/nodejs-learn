// import { v2 as cloudinary } from 'cloudinary';
const v2 = require('cloudinary')
const fs = require('fs')

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null

    const res = await v2.uploader.upload(localFilePath, {
      resource_type: "auto"
    })
    console.log("file is uploaded on cloudinary", res.url);
    return res;
  } catch (error) {
    fs.unlinkSync(localFilePath)
  }
}

module.exports = uploadOnCloudinary;