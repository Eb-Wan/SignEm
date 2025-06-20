import { body } from "express-validator";

export const sessionValidator = [
    body("nom")
        .isString().withMessage("Le nom doit être une chaine de caratères")
        .notEmpty().withMessage("Le nom est obligatoire")
        .escape()
        .stripLow(),
    body("formationId")
        .notEmpty().withMessage("L'id de formation est obligatoire")
        .isMongoId().withMessage("L'id de formation doit être un ID MongoDB")
];