import mongoose from "mongoose";



const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }]
})


export const User = mongoose.model("User", UserSchema)