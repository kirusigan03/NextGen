const cloudinary = require("cloudinary").v2;

require("dotenv").config(); 

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});


// cloudinary.config({
//   cloud_name: 'dk2qubci7',
//   api_key: '259447953353957',
//   api_secret: 'qdxDFIrBhXs-9z14xg8PmqjpRi0',
// });

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};


module.exports = (image) => {
  //imgage = > base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        // console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};