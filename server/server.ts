import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import authRoute from './routes/authRoute'
import testRoute from './routes/testRoute'
import cors from 'cors'
import dbConnect from './config/dbConnect'
import mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'

dotenv.config()

const app = express()
const PORT = 3500

dbConnect() // Connect to the mongoDB

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })

})

mongoose.connection.on('error', err => {
    console.log(err)
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))

app.use('/auth', authRoute)
app.use('/test', testRoute)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log('An error happened', err)
    const status = res.statusCode ? res.statusCode : 500
    res.status(status)
    res.json({message: err.message})
})
