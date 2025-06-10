import mongoose from "mongoose";

const compteShema = mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    tel: { type: String, required: true, unique: true },
    mdp: { type: String, required: true },
    role: { type: String, required: true, enum:["SansDroits", "Stagiaire", "Formateur", "Administrateur"], default: "SansDroits" },
    sessionId: { type:String, default: "none" },
    data: {
        preferences: { type: String }
    },
}, { timestamps: true });

const compteModele = mongoose.model("comptes", compteShema);
export default compteModele;