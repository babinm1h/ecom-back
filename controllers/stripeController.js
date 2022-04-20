import Stripe from "stripe"
import { Cart } from "../models/Cart.js";
import { CartItem } from "../models/CartItem.js";
import { Order } from "../models/Order.js"
import { User } from "../models/User.js";


const stripe = new Stripe(process.env.STRIPE_SECRET || `sk_test_51KcmG4CtpeWVakDSnJmvkjVqAFcusogtQZCVZDvTwvNjuhSnx5e1MJElYA0jMoL4IZn40GdrJg5AYub6nw6ExEcp001CGPD5fr`)

const endpointSecret = process.env.STRIPE_SIGN_SECRET || `whsec_5f67e56a14feed8a859590c7fc3845fc095e6db8a022cb9d6a3a00092739aa5e`;


const createOrder = async (session) => {
    try {
        const items = await stripe.checkout.sessions.listLineItems(session.id)

        const order = await Order.create({
            user: session.metadata.user,
            totalPrice: session.amount_total / 100,
            images: JSON.parse(session.metadata.images),
            totalCount: items.data.reduce((prev, cur) => prev + cur.quantity, 0)
        })

        const user = await User.findByIdAndUpdate(order.user, { $push: { orders: order._id } })
        await CartItem.deleteMany({ userId: user._id })
        await Cart.findOneAndUpdate({ userId: user._id }, { items: [] })

        return res.json(order)

    } catch (err) {
        console.log(err);
    }
}


class StripeController {

    async create(req, res) {
        try {
            const { items } = req.body
            const user = req.user

            if (!items || !user) return res.status(400).send()


            const stripeItems = items.map(i => ({
                quantity: i.quan,
                price_data: {
                    currency: "usd",
                    unit_amount: i.item.price * 100,
                    product_data: {
                        name: i.item.title,
                        images: [i.item.img]
                    }
                }
            }))


            const session = await stripe.checkout.sessions.create({
                shipping_address_collection: {
                    allowed_countries: ["RU", "UA", "KZ", "US"]
                },
                line_items: stripeItems,
                mode: 'payment',
                success_url: `${process.env.CLIENT_URL}/success`,
                cancel_url: `${process.env.CLIENT_URL}/cart`,
                payment_method_types: ["card"],
                metadata: {
                    user: user._id.toString(),
                    images: JSON.stringify(items.map(i => i.item.img))
                }
            });

            return res.json(session.id)


        } catch (err) {
            return res.status(500).json({ message: "Server error" + err })
        }
    }



    async webhook(req, res) {
        try {

            const sig = req.headers['stripe-signature'];
            let event = req.body;

            try {
                event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret)
            } catch (err) {
                console.log(err.message);
            }


            if (event.type === "checkout.session.completed") {
                const session = event.data.object
                const order = await createOrder(session).catch(err => console.log(err))
                return res.json(order)
            }

        } catch (err) {
            return res.status(500).json({ message: "Server error" + err })
        }
    }

}


export default new StripeController()