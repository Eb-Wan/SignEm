import { body } from "express-validator";

export const compteRegisterValidator = [
    body("nom")
        .isString().withMessage("Le nom doit être une chaine de caractères")
        .notEmpty().withMessage("Le nom est obligatoire")
        .escape().stripLow(),
    body("prenom")
        .isString().withMessage("Le prénom doit être une chaine de caractères")
        .notEmpty().withMessage("Le prénom est obligatoire")
        .escape().stripLow(),
    body("email")
        .isEmail().withMessage("L'adresse e-mail n'est pas valide")
        .notEmpty().withMessage("L'adresse e-mail est obligatoire")
        .escape().stripLow(),
    body("tel")
        .isString().withMessage("Le numéro de téléphone doit être une chaine de caractères")
        .notEmpty().withMessage("Le numéro de téléphone est obligatoire")
        .escape().stripLow(),
    body("mdp")
        .isString().withMessage("Le mot de passe doit être une chaine de caractères")
        .notEmpty().withMessage("Le mot de passe est obligatoire")
        .escape().stripLow(),
    body("role")
        .isString().withMessage("Le rôle doit être une chaine de caractères")
        .isIn(["SansDroits", "Stagiaire", "Formateur", "Administrateur"]).withMessage("Le rôle doit être soit : SansDroits, Stagiaire, Formateur ou Administrateur")
        .optional().escape().stripLow(),
    body("sessionId")
        .escape().stripLow()
];

export const compteUpdateValidator = [
    body("nom")
        .isString().withMessage("Le nom doit être une chaine de caractères")
        .notEmpty().withMessage("Le nom est obligatoire")
        .escape().stripLow(),
    body("prenom")
        .isString().withMessage("Le prénom doit être une chaine de caractères")
        .notEmpty().withMessage("Le prénom est obligatoire")
        .escape().stripLow(),
    body("email")
        .isEmail().withMessage("L'adresse e-mail n'est pas valide")
        .notEmpty().withMessage("L'adresse e-mail est obligatoire")
        .escape().stripLow(),
    body("tel")
        .isString().withMessage("Le numéro de téléphone doit être une chaine de caractères")
        .notEmpty().withMessage("Le numéro de téléphone est obligatoire")
        .escape().stripLow(),
    body("role")
        .isString().withMessage("Le rôle doit être une chaine de caractères")
        .isIn(["SansDroits", "Stagiaire", "Formateur", "Administrateur"]).withMessage("Le rôle doit être soit : SansDroits, Stagiaire, Formateur ou Administrateur")
        .optional().escape().stripLow(),
    body("sessionId")
        .escape().stripLow()
];