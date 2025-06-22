import Exeption from "../classes/exeption.js";
import compteModele from "../models/compteModele.js";
import emargementModele from "../models/emargementModele.js";
import { sendMail } from "../services/nodemailer.js";
import jwt from "jsonwebtoken";

export const get = async (req, res, next) => {
    try {
        const { sessionId } = req.params;
        let { dateDebut, dateFin } = req.query;
        if (!dateDebut) dateDebut = (new Date).setHours(0,0,0,0);
        if (!dateFin) dateFin = (new Date).setHours(23, 59, 59, 999);

        const emargements = await emargementModele.find({
            date: { $gte: dateDebut, $lte: dateFin },
            sessionId
        }).sort({ date: -1 });
        res.status(200).json({ success: true, emargements });
    } catch (error) {
        next(error);
    }
}
export const create = async (req, res, next) => {
    try {
        const { signature, stagiaires } = req.body;
        if (signature.length <= 300) throw new Exeption("111", "", true);
        if (stagiaires.length <= 0) throw new Exeption("112", "", true);
        const dateNow = new Date();
        const emargements = stagiaires.map(stagiaire => {
            return ({
                formateurId: req.user._id,
                formateurSignature: signature.replace(/<script>/ig, '<p>').replace(/<\/script>/ig, '</p>'),
                stagiaireId: stagiaire,
                date: dateNow,
                sessionId: req.user.sessionId
            });
        });

        //Gère les erreurs
        const emargementResults = await emargementModele.insertMany(emargements);
        const emargementsIds = emargementResults.map(e => e._id);

        const stagiairesResults = await compteModele.find({ _id: { $in: stagiaires} });
        const stagiairesEmails = stagiairesResults.map(e => e.email);

        const token = jwt.sign({ emargementsIds: emargementsIds }, process.env.JWT_SECRET, { expiresIn: "30m" });
        const link = process.env.CORS_ORIGIN+"/stagiaire/signer/"+token;
        // console.log(link);

        const mailHtml = `
            <h1>Signature SignEm</h1>
            <p>Cliquez sur le lien suivant afin de signer votre fiche d'émargement: <a href="${link}">Signer !</a></p>
            <p>Merci et bonne journée !</p>
        `;
        const result = await sendMail("Lien de signature d'émargement SignEm", "Lien de signature d'émargement SignEm : "+link, mailHtml, stagiairesEmails);
        if (result !== true) throw new Exeption("550", result.message, true);

        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
}
export const sign = async (req, res, next) => {
    try {
        const { signature } = req.body;
        const { token } = req.params;
        if (signature.length <= 300) throw new Exeption("111", "", true);
        if (!token) throw new Exeption("540", "", true);

        const { emargementsIds } = jwt.decode(token);
        if (!emargementsIds) throw new Exeption("540", "", true);

        const emargementResults = await emargementModele.find({ _id: { $in: emargementsIds}, stagiaireId: req.user._id });
        if (!emargementResults) throw new Exeption("404", "", true);
        if (emargementResults[0].stagiaireSignature) throw new Exeption("113", "", true);

        const emargementId = emargementResults[0]._id;
        await emargementModele.findByIdAndUpdate(emargementId, { stagiaireSignature: signature });

        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
}