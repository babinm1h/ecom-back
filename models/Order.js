import mongoose from "mongoose";



const OrderSchema = new mongoose.Schema({
    
}, { timestamps })


export const Order = mongoose.model("Order", OrderSchema)