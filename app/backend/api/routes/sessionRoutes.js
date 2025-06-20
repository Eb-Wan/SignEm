import express from "express";
const router = express.Router();

import { authMiddleware, isAdmin } from "../middlewares/protectMiddleware.js";
import { validateRequest } from "../middlewares/validatorMiddleware.js";
import { sessionValidator  } from "../validators/sessionValidation.js";
import { find, create, update, remove } from "../controllers/sessionController.js";
import limiter from "../middlewares/limiter.js";

//implémente validation
router.get("/", authMiddleware, find);
router.post("/admin", limiter, authMiddleware, isAdmin, sessionValidator, validateRequest, create);
router.put("/admin/:id", limiter, authMiddleware, isAdmin, sessionValidator, validateRequest, update);
router.delete("/admin/:id", limiter, authMiddleware, isAdmin, remove);

export default router;