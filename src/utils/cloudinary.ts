import * as cdnry from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config();

const cloudinary = cdnry.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export { cloudinary };
