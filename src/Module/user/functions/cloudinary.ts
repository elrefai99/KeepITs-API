import { v2 as cloudinary } from "cloudinary";
import { UploadImageOptions, UploadImageResult } from "../@types";

let isCloudinaryConfigured = false;

function ensureCloudinaryConfigured() {
     if (isCloudinaryConfigured) return;

     const cloudName: string = process.env.CLOUDINARY_CLOUD_NAME as string;
     const apiKey: string = process.env.CLOUDINARY_API_KEY as string;
     const apiSecret: string = process.env.CLOUDINARY_API_SECRET as string;

     if (!cloudName || !apiKey || !apiSecret) {
          throw new Error(
               "Cloudinary env vars are missing. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET."
          );
     }

     cloudinary.config({
          cloud_name: cloudName,
          api_key: apiKey,
          api_secret: apiSecret,
          secure: true,
     });

     isCloudinaryConfigured = true;
}

function uploadBuffer(buffer: Buffer, options: UploadImageOptions): Promise<UploadImageResult> {
     return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
               {
                    folder: options.folder,
                    public_id: options.publicId,
                    overwrite: options.overwrite ?? true,
                    resource_type: "image",
                    tags: options.tags,
               },
               (error, result) => {
                    if (error) return reject(error);
                    if (!result?.secure_url || !result?.public_id) {
                         return reject(new Error("Cloudinary upload failed: missing secure_url/public_id."));
                    }
                    resolve({ url: result.secure_url, path: result.public_id });
               }
          );

          stream.end(buffer);
     });
}

export async function uploadImageToCloudinary(file: Buffer | string, options: UploadImageOptions): Promise<UploadImageResult> {
     ensureCloudinaryConfigured();

     if (!options?.folder) {
          throw new Error("uploadImageToCloudinary: options.folder is required.");
     }

     if (Buffer.isBuffer(file)) {
          return uploadBuffer(file, options);
     }

     const result = await cloudinary.uploader.upload(file, {
          folder: options.folder,
          public_id: options.publicId,
          overwrite: options.overwrite ?? true,
          resource_type: "image",
          tags: options.tags,
     });

     if (!result?.secure_url || !result?.public_id) {
          throw new Error("Cloudinary upload failed: missing secure_url/public_id.");
     }

     return { url: result.secure_url, path: result.public_id };
}
