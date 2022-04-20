import mongoose from "mongoose";



const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    totalPrice: { type: Number, required: true },
    images: [{ type: String }],
    totalCount: { type: Number, }

}, { timestamps: true })


export const Order = mongoose.model("Order", OrderSchema)