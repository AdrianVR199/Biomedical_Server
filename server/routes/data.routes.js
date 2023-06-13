import { Router } from "express";
import {
  getDepartamentos,
  getCiudades,
  getCorreos,
} from "../controllers/data.controllers.js";
const router = Router();

router.get("/departamentos", getDepartamentos);

router.get("/ciudades/:id", getCiudades);

router.post("/correos", getCorreos);

export default router;
