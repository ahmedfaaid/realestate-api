import { uuid } from 'uuidv4';
import { FileUpload } from 'graphql-upload';
import { cloudinary } from '../utils/cloudinary';

export const cloudinaryUpload = async (image: FileUpload): Promise<any> => {
  const { createReadStream, filename, mimetype } = image;
  const stream = await createReadStream();
  const id = uuid();
  const uploadName = `${id}-${filename.replace(/\..+$/, '')}`;
  let path;

  try {
    await new Promise((resolve, reject) => {
      const response = cloudinary.uploader.upload_stream(
        {
          public_id: uploadName,
          upload_preset: 'lwws63c8-realestate',
        },
        function(error, result) {
          if (error) {
            console.error(error);
            reject(error);
          }

          path = result.secure_url;

          resolve(result);
        },
      );

      stream.pipe(response);
    });
  } catch (error) {
    console.error(error);
  }

  return { id, path, filename: uploadName, mimetype };
};
