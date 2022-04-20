
import mongoose from "mongoose";



const ReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    rate: { type: Number, required: true },
    item: { type: mongoose.Types.ObjectId, ref: "Item" },
    text: { type: String, required: true }
}, { timestamps: true })


export const Review = mongoose.model("Review", ReviewSchema)