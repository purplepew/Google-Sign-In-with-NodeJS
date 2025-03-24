import asyncHandler from 'express-async-handler'
import { OAuth2Client } from 'google-auth-library'
import type { TokenPayload } from 'google-auth-library'
import Users from '../models/Users'
import jwt from 'jsonwebtoken'
import { jwtDecode } from 'jwt-decode'
import type { UserProps } from '../models/Users'

export const redirectToGoogleSignIn = asyncHandler(async (req, res) => {
    const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_ID,
        process.env.GOOGLE_SECRET,
        process.env.CALLBACK_REDIRECT_URI
    )

    const authorizedUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ["openid", "email", "profile"],
    })

    // Link to Google Sign In Page after successful log in, it will give us a code and google will send a request to the callback (redirectUrl variable) passing {query: code: <random_value> }
    res.json({ url: authorizedUrl }) 
})

export const handleGoogleCallback = asyncHandler(async (req, res) => {
    const code = req.query.code as string
    
    if (!code) {
        res.status(400).json({ message: 'Google Authorization Code is required' })
        return
    }

    const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_ID,
        process.env.GOOGLE_SECRET,
        process.env.CALLBACK_REDIRECT_URI
    ) // OAuth2Client authention

    const { tokens } = await oAuth2Client.getToken(code) // exchange code for token

    await oAuth2Client.setCredentials(tokens) // configures the OAuth2Client credentials with the token

    const { id_token } = oAuth2Client.credentials

    const decoded = jwtDecode(id_token as string) as TokenPayload

    if (!decoded.sub || !decoded.name || !decoded.email || !decoded.picture) {
        res.status(500).json({ message: 'Encrypted Google\'s id_token does not contain important data' })
        return
    }

    const refreshToken = jwt.sign(
        {
            "UserInfo": {
                "googleId": decoded.sub,
                "email": decoded.email,
                "name": decoded.name,
                "image": decoded.picture,
            }
        },
        process.env.JWT_REFRESH_TOKEN_SECRET as string,
        { expiresIn: `15m` }
    )

    res.cookie('jwt', refreshToken, {
        httpOnly: true, secure: true, sameSite: 'none', maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.redirect(303, process.env.FRONTEND_URL as string) // immediately redirects user after setting up the credential cookie

    // the client is currently at the page, logged in, but this is still running on the server.
    const foundUser = await Users.findOne({ googleId: decoded.sub }).exec()

    if (!foundUser) { // When googleId does not exist in the database, makes one.
        const userObject: UserProps = {
            googleId: decoded.sub,
            email: decoded.email,
            name: decoded.name,
            image: decoded.picture,
        }
        await Users.create(userObject)
    } else {
        // Migration logic (uncomment when needed) AND UPDATE THE TYPE FOR THE MODEL SCHEMA
        //if (!foundUser.newKey) {
        //     await Users.updateOne({ googleId: decoded.sub }, { $set: { newKey: 0 } });
        // }
    }
})

export const refreshToken = asyncHandler(async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        res.status(401).json({ message: 'Unauthorized!!' })
        return
    }

    const token = cookies.jwt

    jwt.verify(
        token,
        process.env.JWT_REFRESH_TOKEN_SECRET as string,
        async (err: any, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            if (!decoded) return res.status(403).json({ message: 'Could not decode jwt cookie' })

            const foundUser = await Users.findOne({ googleId: decoded.UserInfo.googleId }).lean().exec()

            if (!foundUser) return res.status(404).json({ message: 'User not found' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "googleId": foundUser.googleId,
                        "email": foundUser.email,
                        "name": foundUser.name,
                        "image": foundUser.image,
                    }
                },
                process.env.JWT_ACCESS_TOKEN_SECRET as string,
                { expiresIn: '5m' }
            )

            res.json({ accessToken })
            return
        });

})

export const logout = asyncHandler(async (req, res) => {
    const cookies = req.cookies
    if (!cookies.jwt) {
        res.status(204).json({ message: 'JWT Cookie not found.' })
    }

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
    res.json({ message: 'JWT Cookie cleared' })
})