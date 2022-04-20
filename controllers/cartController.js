import { Cart } from "../models/Cart.js"
import { CartItem } from "../models/CartItem.js"


class CartController {

    async getCart(req, res) {
        try {
            const userId = req.user._id
            if (!userId) return res.status(400).send()

            const cart = await CartItem.find({ userId }).populate("item")
            return res.json(cart)

        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }


    async create(req, res) {
        try {
            const userId = req.user._id
            if (!userId) return res.status(400).send()

            const itemId = req.params.id

            const cart = await Cart.findOne(userId)
            if (!cart) return res.status(400).send()

            const candidate = await CartItem.findOne({ userId, item: itemId })
            if (candidate) {
                candidate.quan += 1
                await candidate.save()
                return res.json(candidate)
            }

            const newItem = await CartItem.create({ userId, item: itemId })
            cart.items.push(newItem._id)
            await cart.save()

            return res.json(newItem)

        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }


    async delete(req, res) {
        try {
            const userId = req.user._id
            const itemId = req.params.id

            const cart = await Cart.findOne({ userId })
            if (!cart) return res.status(400).json({ message: userId })

            cart.items = cart.items.filter(i => i._id.toString() !== itemId.toString())
            await cart.save()

            const item = await CartItem.findOneAndDelete({ _id: itemId, userId }).populate("item")
            return res.json(item)


        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }


    async incr(req, res) {
        try {
            const userId = req.user._id
            const itemId = req.params.id

            const item = await CartItem.findOne({ id: itemId, userId }).populate("item")

            item.quan += 1
            await item.save()
            return res.json(item)

        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }


    async decr(req, res) {
        try {
            const userId = req.user._id
            const itemId = req.params.id

            const item = await CartItem.findOne({ id: itemId, userId }).populate("item")

            item.quan -= 1
            await item.save()
            return res.json(item)


        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }

}


export default new CartController()