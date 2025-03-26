import Users from "../models/Users"
import asyncHandler from "express-async-handler"


export const removePointsAttribute = asyncHandler(async (req, res) => {
    const result = await Users.updateMany(
        {
            points: {
                $exists: true
            }
        },
        {
            $unset: { points: "" } // Remove the "points" field
        }

    )
    const users = await Users.find({points: {$exists: true}}).lean().exec()
    res.json({ message: 'done', users, result})
})

