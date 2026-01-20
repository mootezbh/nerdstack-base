import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import apiRoutes from "./modules/index";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get("/health", (req: Request, res: Response) => res.json({ status: "up" }));
app.use("/api", apiRoutes);

// 404 & Global Error Logic
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
