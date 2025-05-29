import mongoose from "mongoose";

const formationSchema = mongoose.Schema({
    nom: { type: String },
    ouverte: { type: Boolean }
});

const formationModele = mongoose.model("centres", formationSchema);
export default formationModele;