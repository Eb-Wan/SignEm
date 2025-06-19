import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.errors.map(error => error.msg);
        const message = messages.toString();
        return res.status(400).json({ success: false, message })
    };
    next();
};
