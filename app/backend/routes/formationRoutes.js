import express from "express";
const router = express.Router();

import { authMiddleware, isAdmin } from "../middlewares/protectMiddleware.js";
// import { validateRegister, validateRequest } from "../middlewares/validatorMiddleware";
import { find, create, update, remove } from "../controllers/formationController.js";

//implémente validation
router.get("/", authMiddleware, find);
router.post("/admin", authMiddleware, isAdmin, create);
router.put("/admin/:id", authMiddleware, isAdmin, update);
router.delete("/admin/:id", authMiddleware, isAdmin, remove);

export default router;