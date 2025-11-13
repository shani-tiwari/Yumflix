const ImageKit = require("imagekit");

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(fileBuffer, fileName) {
  try {
    const response = await client.upload({
      file: fileBuffer, // directly pass the buffer
      fileName: fileName,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}

module.exports = { uploadFile };
