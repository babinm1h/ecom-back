import mongoose from "mongoose";



const CartSchema = new mongoose.Schema({
    items: [{ type: mongoose.Types.ObjectId, ref: "CartItem" }],
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" }
})


export const Cart = mongoose.model("Cart", CartSchema)