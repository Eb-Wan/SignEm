import express from "express";
const router = express.Router();

import { authMiddleware, isAdmin, isFormateur } from "../middlewares/protectMiddleware.js";
// import { validateRegister, validateRequest } from "../middlewares/validatorMiddleware";
import { createFirstAccount, login, logout, auth, userUpdate, adminRegister, adminUpdate, adminRemove, adminList, formateurList } from "../controllers/compteController.js";

// router.post("/", createFirstAccount);

router.get("/auth", auth);

router.post("/login", login);
router.get("/logout", logout);

// router.put("/", authMiddleware, userUpdate);

router.get("/formateur/list", authMiddleware, isFormateur, formateurList);

router.get("/admin/list", authMiddleware, isAdmin, adminList);
//implémente validation
router.post("/admin/", authMiddleware, isAdmin, adminRegister);
router.put("/admin/:id", authMiddleware, isAdmin, adminUpdate);
router.delete("/admin/:id", authMiddleware, isAdmin, adminRemove);

export default router;