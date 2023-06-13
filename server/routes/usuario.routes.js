import { Router } from "express";
import {
  getUsuario,
  getUsuarios,
  deleteUsuario,
  updateUsuario,
} from "../controllers/usuarios.controllers.js";
import {auth} from '../lib/auth.js'
const router = Router();

router.get("/usuarios",auth.isLoggedIn, getUsuarios);

router.get("/usuarios/:id",auth.isLoggedIn, getUsuario);

router.put("/usuarios/:id",auth.isLoggedIn, updateUsuario);

router.delete("/usuarios/:id",auth.isLoggedIn, deleteUsuario);

export default router;