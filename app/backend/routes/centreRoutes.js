import express from "express";
const router = express.Router();

import { authMiddleware, isAdmin } from "../middlewares/protectMiddleware.js";
// import { validateRegister, validateRequest } from "../middlewares/validatorMiddleware";
import { find, create, update, remove } from "../controllers/centreController.js";

//implémente validation
router.get("/", authMiddleware, find);
router.post("/admin", authMiddleware, isAdmin, create);
router.put("/admin/:id", authMiddleware, isAdmin, update);
router.delete("/admin/:id", authMiddleware, isAdmin, remove);

export default router;