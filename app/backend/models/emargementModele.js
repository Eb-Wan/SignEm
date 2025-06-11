import mongoose from "mongoose";

const emargementSchema = mongoose.Schema({
    sessionId: { type: mongoose.Schema.ObjectId, required: true },
    formateurId: { type: mongoose.Schema.ObjectId, required: true },
    formateurSignature: { type: String, required: true },
    stagiaireId: { type: mongoose.Schema.ObjectId, required: true },
    stagiaireSignature: { type: String, default:"" },
    date: { type: Date, required: true }
});

const emargementModele = mongoose.model("emargements", emargementSchema);
export default emargementModele;