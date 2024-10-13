import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import {
  cloudinary_API_Key,
  cloudinary_API_Sceret,
  cloudinary_cloud_name,
} from "./constant";

cloudinary.config({
  cloud_name: cloudinary_cloud_name,
  api_key: cloudinary_API_Key,
  api_secret: cloudinary_API_Sceret,
});

export const UploadImage = async (filePath: string) => {
  if (!filePath) {
    return null;
  }

  try {
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // response: {
    //   asset_id: '75e4e7ae6d225fc479e24d7937514902',
    //   public_id: 'wallpaperflare.com_wallpaper.jpg',
    //   version: 1719226225,
    //   version_id: '39d108749f39ea799cc0d1ad5c9e0afd',
    //   signature: '333e0997fc2f512f545e44a1618beab89d7f8c9a',
    //   width: 1920,
    //   height: 1080,
    //   format: 'jpg',
    //   resource_type: 'image',
    //   created_at: '2024-06-24T10:50:25Z',
    //   tags: [],
    //   bytes: 363753,
    //   type: 'upload',
    //   etag: '87b196203fe4d15eeba27ab4a58fc243',
    //   placeholder: false,
    //   url: 'http://res.cloudinary.com/ecommerece/image/upload/v1719226225/wallpaperflare.com_wallpaper.jpg.jpg',
    //   secure_url: 'https://res.cloudinary.com/ecommerece/image/upload/v1719226225/wallpaperflare.com_wallpaper.jpg.jpg',
    //   folder: '',
    //   original_filename: '8bdc51b79a66cfeb9fe27d4fe1a074b0',
    //   api_key: '547216871574165'
    // }

    return response;
  } catch (error) {
    fs.unlinkSync(filePath);
    return null;
  }
};
