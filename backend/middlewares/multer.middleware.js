const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        resource_type: 'auto', // Allows handling both images and PDFs
        format: async (req, file) => {
            const ext = file.mimetype.split('/')[1]; // Automatically determine the file format
            return ext;
        },
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
});

const upload = multer({ storage });

module.exports = upload;
