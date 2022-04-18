import cloudinary from "../middleware/cloudinary.js"
import { Item } from "../models/Item.js"



class ItemsController {

    async getItems(req, res) {
        try {
            let query = {}
            let sort = {}

            let { category, price, brand, min, activeSort } = req.query

            if (activeSort === "priceAsc") sort.price = 1
            if (activeSort === 'priceDesc') sort.price = -1

            if (brand) query.brand = { $in: brand }
            if (category) query.category = { $in: category }
            if (price) query.price = { $lte: price }

            let items = await Item.find(query).sort(sort).populate("brand")

            return res.json(items)

        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }




    async create(req, res) {
        try {
            const { title, category, price, brand } = req.body

            const file = req.file
            if (!file) return res.status(400).send()

            cloudinary.v2.uploader.upload_stream({ folder: "amazon" }, async (err, result) => {
                if (!result || err) throw new Error("Cloudinary error", err)

                const url = result.secure_url
                const item = await Item.create({ title, img: url, category, price, brand })

                return res.status(201).json(item)

            }).end(file.buffer)



        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }


    async delete(req, res) {
        try {
            const id = req.params.id
            const item = await Item.findByIdAndDelete(id)

            return res.json(item)

        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }


    async getOne(req, res) {
        try {
            const id = req.params.id
            const item = await Item.findById(id).populate("brand")

            return res.json(item)

        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }


    async getSimilar(req, res) {
        try {
            const categ = req.params.categ
            const items = await Item.find({ category: { $in: categ } })

            return res.json(items)

        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }

}


export default new ItemsController()