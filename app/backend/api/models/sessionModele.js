import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
    nom: { type: String, required: true, unique: true },
    formationId: { type: mongoose.Schema.ObjectId, required: true }
});

const sessionModele = mongoose.model("sessions", sessionSchema);
export default sessionModele;