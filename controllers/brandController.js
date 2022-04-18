import { Brand } from "../models/Brand.js"



class BrandController {


    async create(req, res) {
        try {
            const { title } = req.body
            const candidate = await Brand.findOne({ title })
            if (candidate) return res.status(400).json({ message: "Brand title is already in use" })

            const brand = await Brand.create({ title })
            return res.json(brand)

        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }

    async getAll(req, res) {
        try {
            const brands = await Brand.find()
            return res.json(brands)

        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }


    async delete(req, res) {
        try {
            const id = req.params.id
            const brand = await Brand.findByIdAndDelete(id)

            return res.json(brand)

        } catch (err) {
            return res.status(500).json({ message: "Server error" })
        }
    }


}


export default new BrandController()