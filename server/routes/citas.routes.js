import { Router } from "express";
import {
  getCita,
  getCitas,
  createCita,
  deleteCita,
  updateCita,
  getCitasC,
  getHorasCitas
} from "../controllers/citas.controllers.js";
import {auth} from '../lib/auth.js'
const router = Router();

router.get("/citas",auth.isLoggedIn, getCitas);

router.get("/citascompletas",auth.isLoggedIn, getCitasC);

router.get("/citas/:id",auth.isLoggedIn, getCita);

router.post("/horarios",auth.isLoggedIn, getHorasCitas);

router.post("/citas",auth.isLoggedIn, createCita);

router.put("/citas/:id",auth.isLoggedIn, updateCita);

router.delete("/citas/:id",auth.isLoggedIn, deleteCita);

export default router;
