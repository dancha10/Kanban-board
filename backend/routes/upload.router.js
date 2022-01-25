const {Router} = require('express');
const router = Router();

const MultiUploadFile = require('../middleware/multiUpload.middleware')

//api/upload/
router.post('/', MultiUploadFile, async (request, response) => {
    try {
        //console.log(request.files)
        response.status(201).json(request.files)
    } catch (e) {
        response.status(500).json({message: 'C файлом беды...'});
    }
})

module.exports = router;