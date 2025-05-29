import mongoose from "mongoose";

const emargementSchema = mongoose.Schema({
    sessionId: { type: mongoose.Schema.ObjectId },
    apprentitId: { type: mongoose.Schema.ObjectId },
    formateurId: { type: mongoose.Schema.ObjectId },
    date: { type: Date }
});

const emargementModele = mongoose.model("centres", emargementSchema);
export default emargementModele;