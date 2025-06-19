import express from "express";
const router = express.Router();

import { authMiddleware, isAdmin } from "../middlewares/protectMiddleware.js";
import { validateRequest } from "../middlewares/validatorMiddleware.js";
import { formationValidator } from "../validators/formationValidation.js";
import { find, create, update, remove } from "../controllers/formationController.js";

//implémente validation
router.get("/", authMiddleware, find);
router.post("/admin", authMiddleware, isAdmin, formationValidator, validateRequest, create);
router.put("/admin/:id", authMiddleware, isAdmin, formationValidator, validateRequest, update);
router.delete("/admin/:id", authMiddleware, isAdmin, remove);

export default router;