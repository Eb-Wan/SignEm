import Exeption from "../classes/exeption.js";
import sessionModele from "../models/sessionModele.js";

export const find = async (req, res, next) => {
    try {
        const { nom, formationId, centreId, dateDebut, dateFin } = req.query;
        const sessions = await sessionModele.find({ $or:[ {nom}, {formationId}, {centreId}, {dateDebut}, {dateFin}, {} ]});
        if (!sessions) throw new Exeption("403", {}, true);
        res.status(200).json({ success: true, sessions });
    } catch (error) {
        next(error);
    }
}
export const create = async (req, res, next) => {
    try {
        const { nom, formationId, centreId, dateDebut, dateFin } = req.body;
        await sessionModele.create({ nom, formationId, centreId, dateDebut, dateFin });
        res.status(201).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("232", "", true);
        next(error);
    }
}
export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nom, formationId, centreId, dateDebut, dateFin } = req.body;
        const session = await sessionModele.findByIdAndUpdate(id, { nom, formationId, centreId, dateDebut, dateFin });
        if (session) res.status(200).json({ success: true });
        else throw new Exeption("403", "", true);
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("232", "", true);
        next(error);
    }
}
export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const session = sessionModele.findById(id);
        if (!session) throw new Exeption("403", {}, true);
        await sessionModele.findByIdAndDelete(id);
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
}