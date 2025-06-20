import Exeption from "../classes/exeption.js";
import compteModele from "../models/compteModele.js";

import axios from "axios";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "12h" });

export const createFirstAccount = async (req, res, next) => {
    try {
        const count = await compteModele.countDocuments({});
        if (count > 0) throw new Exeption("030", "", true);
        const { nom, prenom, email, tel, mdp } = req.body;

        if (!(nom && prenom && email && tel && mdp)) throw new Exeption(110, "", true);
        
        const salt = await bcrypt.genSalt(8);
        const hashedPass = await bcrypt.hash(mdp, salt);
        await compteModele.create({ nom, prenom, email, tel, mdp: hashedPass });

        res.status(201).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption(230, error, true)
        next(error);
    }
};

export const adminList = async (req, res, next) => {
    try {
        const { nom, prenom, email, tel, role, sessionId } = req.query;
        const comptes = (nom || prenom || email || tel || role || sessionId) ? 
            await compteModele.find({ $or: [{nom}, {prenom}, {email}, {tel}, {role}, {sessionId}] }, "nom prenom email tel role sessionId"):
            await compteModele.find({}, "nom prenom email tel role sessionId");
        res.status(200).json({ success: true, comptes });
    } catch (error) {
        next(error);
    }
};
export const formateurList = async (req, res, next) => {
    try {
        const { nom, prenom, email } = req.query;
        const { sessionId } = req.user;
        const comptes = await compteModele.find({ $or: [{nom}, {prenom}, {email}, {sessionId}], role: {$not:{ $eq:"Formateur" }} }, "nom prenom email");
        res.status(200).json({ success: true, comptes });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, mdp, captchaToken } = req.body;

        const isProd = process.env.PROD_ENV === "true";
        const captchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`;
        const captcha = await axios.post(captchaUrl);

        if (!captcha.data.success && isProd) throw new Exeption("120", "", true);
        if (!(email && mdp)) throw new Exeption("110", "", true);

        const user = await compteModele.findOne({ email });
        const passMatch = user ? await bcrypt.compare(mdp, user.mdp):false;
        
        if (!passMatch) throw new Exeption("220", "", true);


        const token = generateToken(user.id);
        res.cookie("token", token, { httpOnly: true, maxAge: 12*60*60*1000, secure: isProd, sameSite: isProd ? "none" : "lax" });
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        res.cookie("token", "", { maxAge: 0 });
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);        
    }
};

export const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(200).json({ sucess:true, isLoggedIn: false });
    
        const { id } = jwt.decode(token)
        if (!id) throw new Exeption("250", "", true);
    
        const user = await compteModele.findById(id).select("-password");
        if (!user) throw new Exeption("250", "", true);
    
        res.status(200).json({ success: true, isLoggedIn: true, role: user.role, nom: user.nom, prenom: user.prenom, session: user.sessionId });
        next();
    } catch (error) {
        next(error);
    }
};
export const userUpdate = async (req, res, next) => {
    try {
        const { email, tel } = req.body;
        const user = req.user;
        
        if (!user) throw new Exeption("401", "", true);
        
        await compteModele.findByIdAndUpdate(user.id, { email, tel });
        res.status(200).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("230", error, true)
            next(error);
    }
};

export const adminRegister = async (req, res, next) => {
    try {
        const { nom, prenom, email, tel, mdp, mdpCheck, role, sessionId } = req.body;

        if (!(nom && prenom && email && tel && mdp && mdpCheck)) throw new Exeption("110", "", true);
        if (mdp !== mdpCheck) throw new Exeption("130", "", true);
        const salt = await bcrypt.genSalt(8);
        const hashedPass = await bcrypt.hash(mdp, salt);
        await compteModele.create({ nom, prenom, email, tel, mdp: hashedPass, role, sessionId });

        res.status(201).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("230", error, true)
        next(error);
    }
};
export const adminUpdate = async (req, res, next) => {
    try {
        const { nom, prenom, email, tel, role, sessionId } = req.body;
        const { id } = req.params;

        if (!(nom && prenom && email && tel && role && sessionId)) throw new Exeption("110", "", true);
        const user = await compteModele.findByIdAndUpdate(id, { nom, prenom, email, tel, role, sessionId });
        if (!user) throw new Exeption("401", "", true);
        res.status(200).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("230", error, true);
        next(error);
    }
};

export const adminRemove = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await compteModele.findById(id);
        if (!user) throw new Exeption("401" , "", true);
        await compteModele.findByIdAndDelete(id);
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};