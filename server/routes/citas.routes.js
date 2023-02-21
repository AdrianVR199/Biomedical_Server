import { Router } from "express";
import {
  getCita,
  getCitas,
  createCita,
  deleteCita,
  updateCita,
} from "../controllers/citas.controllers.js";
const router = Router();

router.get("/citas", getCitas);

router.get("/citas/:id", getCita);

router.post("/citas", createCita);

router.put("/citas/:id", updateCita);

router.delete("/citas/:id", deleteCita);

export default router;
