import mongoose from 'mongoose'

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI as string)
    } catch (error) {
        console.log('db connect error ', error)
    }
}

export default dbConnect