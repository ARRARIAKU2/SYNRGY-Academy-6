const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dpmmsdjxy',
  api_key: '647487294136952',
  api_secret: 'QqYFTekIr0BnHj9gJ6Wn3vlD_F0'
});

module.exports = cloudinary;