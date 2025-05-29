import Exeption from "../classes/exeption.js";
import formationModele from "../models/formationModele";

export const find = (req, res, next) => {
    try {
        const { nom, ouverte } = req.query;
        const formations = formationModele.find({ nom, ouverte });
        res.status(200).json({ success: true, formations });
    } catch (error) {
        next(error);
    }
}
export const create = (req, res, next) => {
    try {
        const { nom, ouverte } = req.body;
        formationModele.create({ nom, ouverte });
        res.status(201).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("230", "", true);
        next(error);
    }
}
export const update = (req, res, next) => {
    try {
        const { id } = req.param;
        const { nom, ouverte } = req.body;
        const formation = formationModele.findByIdAndUpdate(id, { nom, ouverte });
        if (formation) res.status(200).json({ success: true });
        else throw new Exeption("200", "", true);
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("230", "", true);
        next(error);
    }
}
export const remove = (req, res, next) => {
    try {
        const { id } = req.param;
        const formation = formationModele.findByIdAndDelete(id);
        if (formation) res.status(200).json({ success: true });
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
}