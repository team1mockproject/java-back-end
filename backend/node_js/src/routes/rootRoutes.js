import express from "express";
import authRoutes from "./authRoutes.js";

const rootRoute = express.Router();

rootRoute.use("/auth", authRoutes);
export default rootRoute;
