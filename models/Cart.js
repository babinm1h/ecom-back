import mongoose from "mongoose";



const CartSchema = new mongoose.Schema({
    items: [{ type: mongoose.Types.ObjectId, ref: "CartItem" }],
    userId: { type: String, required: true }
})


export const Cart = mongoose.model("Cart", CartSchema)