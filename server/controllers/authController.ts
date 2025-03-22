import { OAuth2Client } from 'google-auth-library'
import type { TokenPayload } from 'google-auth-library'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { jwtDecode } from 'jwt-decode'

type Props = (req: Request, res: Response) => any

export const redirectToGoogleSignIn: Props = async (req, res) => {
    const redirectUrl = 'http://localhost:3500/auth/google/callback'

    const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_ID,
        process.env.GOOGLE_SECRET,
        redirectUrl
    )

    const authorizedUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid email profile',
        prompt: 'consent'
    })

    res.json({ url: authorizedUrl }) // Link to Google Sign In Page after successful log in, it will give us a code and google will send a request to the callback (redirectUrl variable) passing {query: code: <random_value> }

}

export const handleGoogleCallback: Props = async (req, res) => {
    const code = req.query.code as string

    if(!code){
        return res.status(400).json({message: 'Google Authorization Code is required'})
    }
    
    try {
        
        const redirectUrl = 'http://localhost:3500/auth/google/callback'
        
        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_ID,
            process.env.GOOGLE_SECRET,
            redirectUrl
        )
        
        const { tokens } = await oAuth2Client.getToken(code) // exchange code for token
        
        await oAuth2Client.setCredentials(tokens)
        
        const { id_token } = oAuth2Client.credentials
        
        const decoded = jwtDecode(id_token as string) as TokenPayload
        
        const refreshToken = jwt.sign(
            {
                "UserInfo": {
                    googleId: decoded.sub,
                    email: decoded.email,
                    name: decoded.name,
                    image: decoded.picture,
                }
            },
            process.env.JWT_REFRESH_TOKEN_SECRET as string,
            { expiresIn: `15m` } 
        )


        res.cookie('jwt', refreshToken, {
            httpOnly: true, secure: true, sameSite: 'none', maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.redirect(303, 'http://localhost:5173')
    } catch (error) {
        console.log('Error with signing with google')
    }

}

export const refreshToken: Props = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(401).json({ message: 'Unauthorized!!' })
    }

    const token = cookies.jwt
    try {
        jwt.verify(
            token,
            process.env.JWT_REFRESH_TOKEN_SECRET as string,
            async (err, decoded) => {
                if (err) return res.status(403).json({ message: 'Forbidden' })

                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            googleId: decoded.sub,
                            email: decoded.email,
                            name: decoded.name,
                            image: decoded.picture,
                        }
                    },
                    process.env.JWT_ACCESS_TOKEN_SECRET as string,
                    { expiresIn: '5m' }
                )

                return res.json({ accessToken })
            });
    } catch (error) {
        console.log('jwt.verify error', error)
    }

}

export const logout: Props = async (req, res) => {
    const cookies = req.cookies
    if (!cookies.jwt) {
        return res.status(204).json({ message: 'JWT Cookie not found.' })
    }

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
    res.json({message: 'JWT Cookie cleared'})
}