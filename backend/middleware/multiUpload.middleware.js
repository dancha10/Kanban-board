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
        folder: 'Files',
        resource_type: 'raw',
        use_filename: true,
        unique_filename: true,
        public_id: (request, file) => `F${moment().format('DDMMYYYY-HHmmss--SSS')}-${file.originalname}`,
    },
});

module.exports = function MultiUploadFile(request, response, next) {
    const MultiUpload = multer({storage: storage}).fields(
        [
            {
                name: 'cover',
                maxCount: 1
            },
            {
                name: 'files', maxCount: 3
            }
        ]
    )

    MultiUpload(request, response, function (error) {
        if (error instanceof multer.MulterError) { // TODO переписать вывод ошибки
            console.log('-----------------')
            console.log('---MulterMulti---')
            console.log('-----------------')
            response.status(400).json(error.message)
        } else if (error) {
            response.status(400).json(error.message)
        }
        next()
    })
}