import { body } from "express-validator";

export const formationValidator = [
    body('nom')
        .isString().withMessage('Le nom doit être une chaine de caratères')
        .notEmpty().withMessage('Le nom est obligatoire')
        .escape()
        .stripLow(),
    body('ouverte')
        .optional()
        .isBoolean().withMessage('Le champ "ouverte" doit être un bouléen.')
];