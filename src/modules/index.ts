import { Router } from "express";
import userRoutes from "./user/user.routes";

const router = Router();

// Register module routes
router.use("/users", userRoutes);
// Add more module routes here as needed
// router.use("/posts", postRoutes);
// router.use("/auth", authRoutes);

export default router;
