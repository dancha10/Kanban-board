// Заморожен
/*
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');

const config = require('config')
const moment = require("moment");

cloudinary.config({
    cloud_name: config.get('CLOUD_NAME'),
    api_key: config.get('API_KEY'),
    api_secret: config.get('API_SECRET')
});
// TODO в public_id дополнить replace
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    //allowedFormats: ['jpeg', 'jpg', 'png', 'rar', 'zip', 'txt', 'docx', 'json', 'xlsx', 'svg'],
    params: {
        folder: 'Covers',
        use_filename: true,
        unique_filename: true,
        public_id: (request, file) => `${moment().format('DDMMYYYY-HHmmss--SSS')}-${file.originalname.replace(file.originalname.split('.').pop(), '').slice(0, -1)}`,
    },
});

module.exports = function uploadFile(request, response, next) {
    const maxSize = 5 * 1024 * 1024
    const upload = multer({storage, limits: {fileSize: maxSize}}).single('cover');

    upload(request, response, function (error) {
        if (error instanceof multer.MulterError) { // TODO переписать вывод ошибки
            console.log('------------')
            console.log('---Multer---')
            console.log('------------')
            response.status(error?.storageErrors[0]?.http_code).json(error.message)
        } else if (error) {
            response.status(400).json(error)
        }
        next()
    })
}*/
