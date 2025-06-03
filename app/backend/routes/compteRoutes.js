import express from "express";
const router = express.Router();

import { authMiddleware, isAdmin } from "../middlewares/protectMiddleware.js";
// import { validateRegister, validateRequest } from "../middlewares/validatorMiddleware";
import { createFirstAccount, list, login, logout, getRole, userUpdate, adminRegister, adminUpdate, adminRemove } from "../controllers/compteController.js";

router.post("/", createFirstAccount);

router.post("/login", login);
router.get("/logout", logout);

router.get("/list", list);
router.get("/role", authMiddleware, getRole);

router.put("", authMiddleware, userUpdate);

//implémente validation
router.post("/admin/:id", authMiddleware, isAdmin, adminRegister);
router.put("/admin/:id", authMiddleware, isAdmin, adminUpdate);
router.delete("/admin/:id", authMiddleware, isAdmin, adminRemove);

export default router;