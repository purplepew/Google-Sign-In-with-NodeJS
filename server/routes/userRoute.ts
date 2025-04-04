import express from 'express'
import { changeDisplayPicture, getAllUsers } from '../controllers/userController'

const router = express.Router()

router.route('')
.get(getAllUsers)

router.route('/change/dp')
.post(changeDisplayPicture)

export default router