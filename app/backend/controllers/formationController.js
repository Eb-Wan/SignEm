import Exeption from "../classes/exeption.js";
import formationModele from "../models/formationModele.js";

export const find = async (req, res, next) => {
    try {
        const { nom, ouverte } = req.query;
        const formations = await formationModele.find({ $or:[{nom}, {ouverte}, {}] });
        res.status(200).json({ success: true, formations });
    } catch (error) {
        next(error);
    }
}
export const create = async (req, res, next) => {
    try {
        const { nom, ouverte } = req.body;
        await formationModele.create({ nom, ouverte });
        res.status(201).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("231", "", true);
        next(error);
    }
}
export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nom, ouverte } = req.body;
        const formation = await formationModele.findByIdAndUpdate(id, { nom, ouverte });
        if (formation) res.status(200).json({ success: true });
        else throw new Exeption("200", "", true);
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("231", "", true);
        next(error);
    }
}
export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const formation = await formationModele.findById(id);
        if (!formation) throw new Exeption("400", {}, true);
        await formationModele.findByIdAndDelete(id);
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
}