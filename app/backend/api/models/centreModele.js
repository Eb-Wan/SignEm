import mongoose from "mongoose";

const centreSchema = mongoose.Schema({
    nom : { type: String, unique: true },
    adresse: { type: String, unique: true },
    codePostal: { type: String },
    ville: { type: String }
});

const centreModele = mongoose.model("centres", centreSchema);
export default centreModele;