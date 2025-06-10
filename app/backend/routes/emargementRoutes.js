import express from "express";
const router = express.Router();

import { authMiddleware, isAdmin, isFormateur, isStagiaire } from "../middlewares/protectMiddleware.js";
// import { validateRegister, validateRequest } from "../middlewares/validatorMiddleware";
import { get, create, sign } from "../controllers/emargementController.js";

//implémente validation

router.post("/:id", authMiddleware, isStagiaire, sign);
router.get("/", authMiddleware, isFormateur, get);
router.post("/", authMiddleware, isFormateur, create);

export default router;