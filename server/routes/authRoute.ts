import express from 'express'
import { logout, redirectToGoogleSignIn, handleGoogleCallback, refreshToken } from '../controllers/authController'

const router = express.Router() // /auth

router.route('/google/callback')
.get(handleGoogleCallback)

router.route('/google')
.get(redirectToGoogleSignIn)

router.route('/refresh')
.get(refreshToken)

router.route('/logout')
.post(logout)

export default router