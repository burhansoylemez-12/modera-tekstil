import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/**
 * Cloudinary'ye resim yükle
 * @param file - Base64 string veya file path
 * @param folder - Cloudinary'de hangi klasöre yüklenecek
 * @returns Yüklenen resmin URL'i
 */
export async function uploadImage(file: string, folder: string = 'products') {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: `urunstok/${folder}`,
      transformation: [
        { width: 1000, height: 1000, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
      ],
    });
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}

/**
 * Cloudinary'den resim sil
 * @param publicId - Silinecek resmin public ID'si
 */
export async function deleteImage(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
}

/**
 * Cloudinary URL'inden public ID çıkar
 * @param url - Cloudinary resim URL'i
 * @returns Public ID
 */
export function getPublicIdFromUrl(url: string): string {
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  const publicId = filename.split('.')[0];
  const folder = parts.slice(parts.indexOf('urunstok')).slice(0, -1).join('/');
  return `${folder}/${publicId}`;
}
