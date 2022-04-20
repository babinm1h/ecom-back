import mongoose from "mongoose";



const CartItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    item: { type: mongoose.Types.ObjectId, ref: "Item", required: true },
    quan: { type: Number, required: true, default: 1 }
}, { timestamps: true })


export const CartItem = mongoose.model("CartItem", CartItemSchema)