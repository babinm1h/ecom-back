import { Item } from "../models/Item.js"
import { Review } from "../models/Review.js"
import { User } from "../models/User.js"



class ReviewsController {

    async getReviews(req, res) {
        try {

        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }


    async create(req, res) {
        try {
            const itemId = req.params.id
            const item = await Item.findById(itemId).populate("reviews")
            if (!item) return res.status(400).send()

            const user = await User.findById(req.user._id)
            if (!user) return res.status(401).send()

            const { rate, text } = req.body

            if (item.reviews.find(r => r.user._id.equals(user._id))) {
                return res.status(400).json({ message: "You have already written a review about this product" })
            }

            const created = await Review.create({ user: user._id, text, rate, item: itemId })

            user.reviews.push(created._id)
            await user.save()

            item.reviews.push(created._id)
            item.allRates.push(rate)
            item.rating = Math.round(item.allRates.reduce(
                (prev, cur) => prev + cur, 0) / item.allRates.length
            )
            await item.save()

            const review = await Review.findById(created._id)
            return res.status(201).json(review)


        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }


    async delete(req, res) {
        try {

        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }

}


export default new ReviewsController()