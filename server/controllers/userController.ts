import asyncHandler from "express-async-handler"
import Users from '../models/Users'

export const getAllUsers = asyncHandler( async (req, res) => {
    const users = await Users.find().lean().exec()
    res.json(users)
})

export const changeDisplayPicture = asyncHandler(async (req, res) => {
    const { googleId, imgUrl } = req.body
    console.log('googleId', googleId)
    console.log('imgUrl', imgUrl)
    if (!googleId || !imgUrl) {
        res.status(400).json({ message: 'No googleId or imgUrl provided' })
        return
    }
    
    const foundUser = await Users.findOne({googleId}).exec()
    
    if(!foundUser){
        res.status(400).json({ message: 'User not found from the provided googleId' })
        return    
    }

    foundUser.image =  imgUrl
    await foundUser.save()

    res.json({message: 'Display Picture Changed'})
})