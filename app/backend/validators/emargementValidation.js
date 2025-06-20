import { body } from "express-validator";

export const emargementCreateValidator = [
    body("stagiaires")
        .isArray({ min: 1 })
        .withMessage("Veuillez selectionner au moins un stagiaire"),
    body("signature")
        .isString().withMessage("La signature du formateur doit être une chaine de caratères contenant un svg")
        .notEmpty().withMessage("La signature du formateur est obligatoire"),
    body("date")
        .optional()
        .isISO8601().withMessage("La date doit être une date ISO 8601")
];
export const emargementSignValidator = [
    body("signature")
        .isString().withMessage("La signature stagiaire doit être une chaine de caratères contenant un svg")
];