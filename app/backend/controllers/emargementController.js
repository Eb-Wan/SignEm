// const stagiaires = formData.getAll("stagiaire");
        //ok if (signature > 228)

import mongoose from "mongoose";
import Exeption from "../classes/exeption.js";
import centreModele from "../models/emargementModele.js";

export const get = (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}
export const create = (req, res, next) => {
    try {
        const { signature, stagiaires } = req.body;

        //Changer propriété data.formation par data.session et tester si elle retourne un objectid
        console.log(req.user.data.session);

        const dateNow = new Date.now();
        const emargements = stagiaires.map(stagiaire => {
            return ({
                sessionId: mongoose.Schema.ObjectId(req.user.data.session),
                formateurId: mongoose.Schema.ObjectId(req.user._id),
                formateurSignature: signature,
                stagiaireId: mongoose.Schema.ObjectId(stagiaire),
                date: dateNow
            });
        });

        //Gère les erreurs
        centreModele.insert({ emargements });

        //Crée le lien et renvoi une réponse
    } catch (error) {
        next(error);
    }
}
export const sign = (req, res, next) => {
    try {
        // Récupère le contenu du token
        // Compare le stagiaire de l'émargement et celui de la requête
        // Si ok prends la signature et ajoute la
    } catch (error) {
        next(error);
    }
}