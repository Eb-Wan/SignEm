import Exeption from "../classes/exeption.js";
import sessionController from "../models/sessionController";

export const find = (req, res, next) => {
    try {
        const { nom, formationId, centreId, dateDebut, dateFin } = req.query;
        const sessions = sessionController.find({ nom, formationId, centreId, dateDebut, dateFin });
        res.status(200).json({ success: true, sessions });
    } catch (error) {
        next(error);
    }
}
export const create = (req, res, next) => {
    try {
        const { nom, formationId, centreId, dateDebut, dateFin } = req.body;
        sessionController.create({ nom, formationId, centreId, dateDebut, dateFin });
        res.status(201).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("230", "", true);
        next(error);
    }
}
export const update = (req, res, next) => {
    try {
        const { id } = req.param;
        const { nom, formationId, centreId, dateDebut, dateFin } = req.body;
        const session = sessionController.findByIdAndUpdate(id, { nom, formationId, centreId, dateDebut, dateFin });
        if (session) res.status(200).json({ success: true });
        else throw new Exeption("200", "", true);
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("230", "", true);
        next(error);
    }
}
export const remove = (req, res, next) => {
    try {
        const { id } = req.param;
        const session = sessionController.findByIdAndDelete(id);
        if (session) res.status(200).json({ success: true });
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
}