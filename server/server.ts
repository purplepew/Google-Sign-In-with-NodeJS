import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import authRoute from './routes/authRoute'
import cors from 'cors'
// import dbConnect from './config/dbConnect'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const PORT = 3500

// dbConnect() // Connect to the mongoDB

// mongoose.connection.once('open', () => {
//     console.log('Connected to MongoDB')
    
// })

// mongoose.connection.on('error', err => {
//     console.log(err)
// })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))

app.use('/auth', authRoute)
