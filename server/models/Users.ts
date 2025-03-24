import mongoose, { Document } from 'mongoose'

export interface UserProps {
    googleId: string, // credentials.sub
    name: string,
    email: string,
    image: string,
}

const user = new mongoose.Schema<UserProps>({
    googleId: {type: String, required: true},
    email: {type: String, required: true},
    name: String,
    image: String,
})

export default mongoose.model<UserProps>('user', user)
