import mongoose from "mongoose";



const BrandSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }
}, { timestamps: true })


export const Brand = mongoose.model("Brand", BrandSchema)