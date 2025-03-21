import { Router } from "express"; 
import { getAll } from "../controllers/api-gateway.controller.ts"; // Corregido

const router = Router();

router.get("/all", getAll);

export default router;
