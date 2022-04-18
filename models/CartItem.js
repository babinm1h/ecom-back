import mongoose from "mongoose";



const CartItemSchema = new mongoose.Schema({
    cartId: { type: mongoose.Types.ObjectId, ref: "Cart" },
    item: { type: mongoose.Types.ObjectId, ref: "Item" }
}, { timestamps })


export const CartItem = mongoose.model("CartItem", CartItemSchema)