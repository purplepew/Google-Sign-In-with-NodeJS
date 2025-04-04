import express from 'express'
import { handleFileUpload } from '../controllers/fileController'
import multer from 'multer'
import crypto from 'crypto'
import path from 'path'

const router = express.Router()

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        const randomName = crypto.randomBytes(16).toString('hex')
        const extension = path.extname(file.originalname)

        cb(null, `${randomName}${extension}`)
    }
})

const upload = multer({ storage })

router.route('/upload')
    .post(upload.single('file'), handleFileUpload)

export default router