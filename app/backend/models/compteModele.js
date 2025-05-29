import mongoose from "mongoose";

const compteShema = mongoose.Schema({
    nom: { type: String, required: true, unique: true },
    prenom: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    tel: { type: String, required: true, unique: true },
    mdp: { type: String, required: true },
    role: { type: String, enum: ["utilisateur", "apprenti", "formateur", "administrateur"], required: true, default: "utilisateur" },
    data: { 
        formation: { type: mongoose.Schema.ObjectId },
        preferences: { type: String }
    },
}, { timestamps: true });

const compteModele = mongoose.model("comptes", compteShema);
export default compteModele;