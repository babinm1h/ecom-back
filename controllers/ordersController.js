import { Order } from "../models/Order.js"
import { User } from "../models/User.js"


class OrdersController {

    async getOrders(req, res) {
        try {
            const userId = req.user._id
            if (!userId) return res.status(400).send()

            const orders = await Order.find({ user: userId })
            return res.json(orders)

        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }



    async delete(req, res) {
        try {
            const userId = req.user._id
            const id = req.params.id

            const order = await Order.findByIdAndDelete(id)
            const user = await User.findById(userId)

            user.orders = user.orders.filter(o => o._id.toString() !== id)
            await user.save()

            return res.json(order)

        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }

}


export default new OrdersController()