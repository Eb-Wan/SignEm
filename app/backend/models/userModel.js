import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["utilisateur", "apprenti", "formateur", "administrateur"], required: true, default: "utilisateur" },
    data: { 
        formation: { type: mongoose.Schema.ObjectId },
        preferences: { type: String }
    },
}, { timestamps: true });

const userModel = mongoose.model("users", userSchema);

export { userModel };