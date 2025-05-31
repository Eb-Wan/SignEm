import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
    nom: { type: String },
    formationId: { type: mongoose.Schema.ObjectId },
    centreId: { type: mongoose.Schema.ObjectId },
    dateDebut: { type: Date },
    dateFin: { type: Date }
});

const sessionModele = mongoose.model("sessions", sessionSchema);
export default sessionModele;