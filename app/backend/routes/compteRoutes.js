import express from "express";
const router = express.Router();

import limiter from "../middlewares/limiter.js";
import { authMiddleware, isAdmin, isFormateur } from "../middlewares/protectMiddleware.js";
import { validateRequest } from "../middlewares/validatorMiddleware.js";
import { compteRegisterValidator, compteUpdateValidator } from "../validators/compteValidation.js";
import { login, logout, auth, adminRegister, adminUpdate, adminRemove, adminList, formateurList } from "../controllers/compteController.js";

// router.post("/", createFirstAccount);

router.get("/auth", auth);

router.post("/login", login);
router.get("/logout", logout);

// router.put("/", authMiddleware, userUpdate);

router.get("/formateur/list", authMiddleware, isFormateur, formateurList);

router.get("/admin/list", authMiddleware, isAdmin, adminList);
router.post("/admin/", limiter, authMiddleware, isAdmin, compteRegisterValidator, validateRequest, adminRegister);
router.put("/admin/:id", limiter, authMiddleware, isAdmin, compteUpdateValidator, validateRequest, adminUpdate);
router.delete("/admin/:id", limiter, authMiddleware, isAdmin, adminRemove);

export default router;