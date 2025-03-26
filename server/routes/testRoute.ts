import express from 'express'
import { removePointsAttribute } from '../controllers/testController'

const router = express.Router()

router.route('/removeAttribute')
.post(removePointsAttribute)

export default router