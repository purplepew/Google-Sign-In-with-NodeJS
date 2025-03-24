import mongoose from 'mongoose'

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI as string)
    } catch (error) {
        console.log('CONNECTING TO MONGODB ERROR: ', error)
    }
}

export default dbConnect