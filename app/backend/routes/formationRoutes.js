import express from "express";
const router = express.Router();

import { authMiddleware, isAdmin } from "../middlewares/protectMiddleware.js";
import { validateRequest } from "../middlewares/validatorMiddleware.js";
import { formationValidator } from "../validators/formationValidation.js";
import { find, create, update, remove } from "../controllers/formationController.js";
import limiter from "../middlewares/limiter.js";

//implémente validation
router.get("/", authMiddleware, find);
router.post("/admin", limiter, authMiddleware, isAdmin, formationValidator, validateRequest, create);
router.put("/admin/:id", limiter, authMiddleware, isAdmin, formationValidator, validateRequest, update);
router.delete("/admin/:id", limiter, authMiddleware, isAdmin, remove);

export default router;