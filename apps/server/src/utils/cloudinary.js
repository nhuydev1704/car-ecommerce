const { v2 } = require('cloudinary');

const streamifier = require('streamifier');

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = v2.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

module.exports = {
  uploadToCloudinary,
};
