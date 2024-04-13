import dotenv from 'dotenv'
dotenv.config()
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'

          
cloudinary.config({
    cloud_name: 'sourav78', 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadOnCloudynary = async (localFilePath, imageName) => {

    try {
        if (!localFilePath){
            return null
        }

        const result = await cloudinary.uploader.upload(localFilePath, {
            public_id: imageName,
            folder: "Ecom-users"
        })

        fs.unlinkSync(localFilePath)

        return result
    } catch (error) {
        fs.unlinkSync(localFilePath)
        // console.log(error.message);
        return null
    }

}