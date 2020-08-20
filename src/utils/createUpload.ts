import { uuid } from 'uuidv4';
import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload';

const storeUpload = async ({ stream, filename, mimetype }) => {
  const id = uuid();
  const path = `images/${id}-${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path, filename, mimetype }))
      .on('error', reject),
  );
};

export const processUpload = async (upload: FileUpload): Promise<any> => {
  const { createReadStream, filename, mimetype } = upload;
  const stream = createReadStream();
  return await storeUpload({ stream, filename, mimetype });
};
