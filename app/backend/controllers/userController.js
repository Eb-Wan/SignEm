import Exeption from "../classes/exeption.js";
import { userModel } from "../models/userModel.js";

import mongoose from "mongoose";
import axios from "axios";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { json } from "express";

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "12h" });

export const createFirstAccount = async (req, res, next) => {
    try {
        const count = await userModel.countDocuments({});
        if (count > 0) throw new Exeption("030", "", true);
        const { firstName, lastName, email, phone, password } = req.body;

        if (!(firstName && lastName && email && phone && password)) throw new Exeption(110, "", true);
        
        const salt = await bcrypt.genSalt(8);
        const hashedPass = await bcrypt.hash(password, salt);
        const user = await userModel.create({ firstName, lastName, email, phone, password: hashedPass });

        res.status(201).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption(230, "", true)
        next(error);
    }
};

export const list = async (req, res, next) => {
    try {
        //add queries here
        
        const users = await userModel.find({}, "firstName lastName email phone");
        res.status(200).json({ success: true, users })
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password, captchaToken } = req.body;

        const isProd = process.env.PROD_ENV === "true";
        const captchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`;
        const captcha = await axios.post(captchaUrl);

        if (!captcha.data.success && isProd) throw new Exeption("120", "", true);
        if (!(email && password)) throw new Exeption("110", "", true);

        const user = await userModel.findOne(email);
        const passMatch = user ? await bcrypt.compare(password, user.password):false;
        
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
        const { email, phone } = req.body;
        const user = req.user;
        
        if (!user) throw new Exeption("410", "", true);
        
        await userModel.findByIdAndUpdate(user.id, { email, phone });
        res.status(200).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("230", "", true)
            next(error);
    }
};

export const adminRegister = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;

        if (!captcha.data.success && isProd) throw new Exeption("120", true);
        if (!(firstName && lastName && email && phone && password)) throw new Exeption("110", "", true);
        
        const salt = await bcrypt.genSalt(8);
        const hashedPass = await bcrypt.hash(password, salt);
        const user = await userModel.create({ firstName, lastName, email, phone, password: hashedPass });

        res.status(201).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption("230", "", true)
        next(error);
    }
};
export const adminUpdate = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone } = req.body;
        const { id } = req.param;

        if (!(firstName && lastName && email && phone && password)) throw new Exeption("110", "", true);

        const user = await userModel.findByIdAndUpdate(id, { firstName, lastName, email, phone });
        if (user) throw new Exeption("410", "", true);
        res.status(200).json({ success: true });
    } catch (error) {
        if (error.code && error.code === 11000) error = new Exeption(230, "", true)
        next(error);
    }
};

export const adminRemove = async (req, res, next) => {
    try {
        const { id } = req.param;

        if (await userModel.findById(id)) throw new Exeption("210" , "", true);
        
        const user = await userModel.findByIdAndRemove(id);
        if (user) throw new Exeption("410", "", true);
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};