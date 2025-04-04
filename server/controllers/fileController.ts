import asyncHandler from 'express-async-handler'
import { Request } from 'express'

interface CustomRequest extends Request {
    file?: {
        path: string
    }
}

export const handleFileUpload = asyncHandler(async (req: CustomRequest, res) => {
    res.json({imgUrl: req.file?.path});
})

