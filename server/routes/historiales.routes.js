import { Router } from "express";
import {
  getHistorial,
  getHistoriales,
  createHistorial,
  deleteHistorial,
  updateHistorial,
} from "../controllers/historial.controllers.js";
const router = Router();

router.get("/historiales", getHistoriales);

router.get("/historiales/:id", getHistorial);

router.post("/historiales", createHistorial);

router.put("/historiales/:id", updateHistorial);

router.delete("/historiales/:id", deleteHistorial);

export default router;
