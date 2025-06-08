import jwt from "jsonwebtoken";
import Exeption from "../classes/exeption.js";
import compteModele from "../models/compteModele.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new Exeption("210", "", true);
    
        const { id } = jwt.decode(token)
        if (!id) throw new Exeption("250", "", true);
    
        const user = await compteModele.findById(id).select("-password -email");
        if (!user) throw new Exeption("250", "", true);
    
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
   
};

export const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "Administrateur") throw new Exeption(240, "", true);
        next();
    } catch (error) {
        next(error);
    }
};
export const isFormateur = async (req, res, next) => {
    try {
        if (req.user.role !== "Formateur") throw new Exeption(240, "", true);
        next();
    } catch (error) {
        next(error);
    }
};