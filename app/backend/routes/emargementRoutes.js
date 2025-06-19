import express from "express";
const router = express.Router();

import { authMiddleware, isFormateur, isStagiaire } from "../middlewares/protectMiddleware.js";
import { validateRequest } from "../middlewares/validatorMiddleware.js";
import { emargementCreateValidator, emargementSignValidator } from "../validators/emargementValidation.js";
import { get, create, sign } from "../controllers/emargementController.js";

router.post("/:token", authMiddleware, isStagiaire, emargementSignValidator, validateRequest, sign);
router.get("/:temps/:sessionId", authMiddleware, isFormateur, get);
router.post("/", limiter, authMiddleware, isFormateur, emargementCreateValidator, validateRequest, create);

export default router;