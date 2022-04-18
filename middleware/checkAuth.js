import jwt from "jsonwebtoken"
import { User } from "../models/User.js"

export const checkAuth = async (req, res, next) => {
    try {
        const token = req.cookies.amazToken
        if (!token) return res.status(401).json({ message: 'Unauthorized' })

        const authUser = jwt.decode(token)
        const user = await User.findById(authUser.id)

        req.user = user
        next()

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}