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
        const user = await compteModele.create({ nom, prenom, email, tel, mdp: hashedPass });

        res.status(201).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption(230, "", true)
        next(error);
    }
};

export const list = async (req, res, next) => {
    try {
        const { nom, prenom, email, tel } = req.query;
        let users;
        if (req.user.role === "administateur") users = await compteModele.find({ nom, prenom, email, tel }, "nom prenom email tel");
        else if (req.user.role === "formateur") users = await compteModele.find({ nom, prenom, email }, "nom prenom email");
        else throw new Exeption("240", "", true);
        if (!users) throw Exeption("410", "", true);
        res.status(200).json({ success: true, users });
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

        const user = await compteModele.findOne(email);
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

export const getRole = async (req, res, next) => {
    try {
        res.status(200).json({ success: true, role: req.user.role });
    } catch (error) {
        next(error);
    }
};
export const userUpdate = async (req, res, next) => {
    try {
        const { email, tel } = req.body;
        const user = req.user;
        
        if (!user) throw new Exeption("410", "", true);
        
        await compteModele.findByIdAndUpdate(user.id, { email, tel });
        res.status(200).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("230", "", true)
            next(error);
    }
};

export const adminRegister = async (req, res, next) => {
    try {
        const { nom, prenom, email, tel, mdp } = req.body;

        if (!captcha.data.success && isProd) throw new Exeption("120", true);
        if (!(nom && prenom && email && tel && mdp)) throw new Exeption("110", "", true);
        
        const salt = await bcrypt.genSalt(8);
        const hashedPass = await bcrypt.hash(mdp, salt);
        await compteModele.create({ nom, prenom, email, tel, mdp: hashedPass });

        res.status(201).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("230", "", true)
        next(error);
    }
};
export const adminUpdate = async (req, res, next) => {
    try {
        const { nom, prenom, email, tel } = req.body;
        const { id } = req.param;

        if (!(nom && prenom && email && tel && mdp)) throw new Exeption("110", "", true);

        const user = await compteModele.findByIdAndUpdate(id, { nom, prenom, email, tel });
        if (user) throw new Exeption("410", "", true);
        res.status(200).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("230", "", true);
        next(error);
    }
};

export const adminRemove = async (req, res, next) => {
    try {
        const { id } = req.param;

        if (await compteModele.findById(id)) throw new Exeption("210" , "", true);
        
        const user = await compteModele.findByIdAndRemove(id);
        if (user) throw new Exeption("410", "", true);
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};