import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = () => {
  const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY } = process.env;

  if (!CLOUDINARY_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_SECRET_KEY) {
    // Allow the server to run locally even if Cloudinary isn't configured.
    // Profile image upload will fail until the env vars are provided.
    console.warn("⚠️ Cloudinary not configured (missing CLOUDINARY_* env vars). Image upload disabled.");
    return;
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_SECRET_KEY,
  });

  console.log("✅ Cloudinary configured successfully");
};

export default connectCloudinary;
