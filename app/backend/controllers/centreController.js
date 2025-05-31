import Exeption from "../classes/exeption.js";
import centreModele from "../models/centreModele.js";

export const find = (req, res, next) => {
    try {
        const { nom, adresse, codePostal, ville } = req.query;
        const centres = centreModele.find({ nom, adresse, codePostal, ville });
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
}
export const create = (req, res, next) => {
    try {
        const { nom, adresse, codePostal, ville } = req.body;
        centreModele.create({ nom, adresse, codePostal, ville });
        res.status(201).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("230", "", true);
        next(error);
    }
}
export const update = (req, res, next) => {
    try {
        const { id } = req.param;
        const { nom, adresse, codePostal, ville } = req.body;
        const centre = centreModele.findByIdAndUpdate(id, { nom, adresse, codePostal, ville });
        if (centre) res.status(200).json({ success: true });
        else throw new Exeption("200", "", true);
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("230", "", true);
        next(error);
    }
}
export const remove = (req, res, next) => {
    try {
        const { id } = req.param;
        centreModele.findByIdAndDelete(id);
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
}