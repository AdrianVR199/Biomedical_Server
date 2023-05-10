import { Router } from "express";
import {
  getHistorial,
  getHistoriales,
  createHistorial,
  deleteHistorial,
  updateHistorial,
} from "../controllers/historial.controllers.js";
import {auth} from '../lib/auth.js'
const router = Router();

router.get("/historiales",auth.isLoggedIn, getHistoriales);

router.get("/historiales/:id",auth.isLoggedIn, getHistorial);

router.post("/historiales",auth.isLoggedIn, createHistorial);

router.put("/historiales/:id",auth.isLoggedIn, updateHistorial);

router.delete("/historiales/:id",auth.isLoggedIn, deleteHistorial);

export default router;
