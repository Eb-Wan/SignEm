import mongoose from "mongoose";

const formationSchema = mongoose.Schema({
    nom: { type: String },
    ouverte: { type: Boolean }
});

const formationModele = mongoose.model("formations", formationSchema);
export default formationModele;