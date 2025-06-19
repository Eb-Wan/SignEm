import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser"
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import fs from "fs";
const app = express();

import Exeption from "./classes/exeption.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { connectDB } from "./config/db.js";
// import cloudinaryConfig from "./config/cloudinary";
import compteRoutes from "./routes/compteRoutes.js";
// import centreRoutes from "./routes/centreRoutes.js";
import formationRoutes from "./routes/formationRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import emargementRoutes from "./routes/emargementRoutes.js";

connectDB();

// if (!fs.existsSync("./logs")) fs.mkdirSync("./logs");
// const accessLogStream = fs.createWriteStream("./logs/access.log", { flags: 'a' })

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials:true }));
app.use(helmet());
// app.use(morgan("common", { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());
app.use("/api/compte", compteRoutes);
// app.use("/api/centre", centreRoutes);
app.use("/api/formation", formationRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/emargement", emargementRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT;
if (PORT) app.listen(PORT, () => console.log("Server is listening on port", PORT));
else {
    console.error(new Exeption("Dotenv has not been configured"));
    process.exit(1);
}