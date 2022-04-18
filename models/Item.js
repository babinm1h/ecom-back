import mongoose from "mongoose";



const ItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    brand: { type: mongoose.Types.ObjectId, ref: "Brand" },
    type:{type:String}
}, { timestamps: true })


export const Item = mongoose.model("Item", ItemSchema)