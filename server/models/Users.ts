import mongoose from 'mongoose'

interface UserProps {
    googleId: string, // credentials.sub
    name: string,
    firstName: string,
    lastName: string,
    email: string,
    image: string
}

const user = new mongoose.Schema<UserProps>({
    googleId: {type: String, required: true},
    email: {type: String, required: true},
    name: String,
    firstName: String,
    lastName: String,
    image: String
})

export default mongoose.model('user', user)
