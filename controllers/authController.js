import { User } from "../models/User.js"
import bcrypt from "bcryptjs"
import { Cart } from "../models/Cart.js"
import jwt from "jsonwebtoken"


const generateJwt = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_KEY)
}


class AuthController {

    async registr(req, res) {
        try {
            const { email, password } = req.body
            const candidate = await User.findOne({ email })
            if (candidate) return res.status(400).json({ message: "This email is already in use" })

            const hashed = await bcrypt.hash(password, 7)
            const user = await User.create({ email, password: hashed })
            const cart = await Cart.create({ userId: user._id })

            const token = generateJwt(user.id, email)
            res.cookie('amazToken', token, {
                secure: true,
                httpOnly: true,
                maxAge: 999999999999,
                sameSite: "none",
            })

            return res.json({...user, token})

        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }


    async login(req, res) {
        try {
            const user = req.user

            if (!user) return res.status(400).json({ message: "No user" })
            const token = generateJwt(user._id, user.email)

            res.cookie('amazToken', token, {
                secure: true,
                httpOnly: true,
                maxAge: 999999999999,
                sameSite: "none",
            })

            return res.json({...user, token})


        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }


    async check(req, res) {
        try {
            const user = req.user
            if (!user) return res.json(400).send()

            return res.json(user)


        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }


    async logout(req, res) {
        try {
            res.clearCookie("amazToken")
            return res.json(true)

        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }

}


export default new AuthController()