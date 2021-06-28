import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = cloudinaryStorage({
    cloudinary,
    folder: 'attachments',
    allowedFormats: ['jpg', 'png', 'jpeg', 'pdf'],
});
const uploads = multer({ storage });

export default uploads;
