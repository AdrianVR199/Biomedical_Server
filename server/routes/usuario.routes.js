import { Router } from "express";
import {
  getUsuario,
  getUsuarios,
  deleteUsuario,
  updateUsuario,
  getUsuarioFullinfo,
  getUserinfo
} from "../controllers/usuarios.controllers.js";
import {auth} from '../lib/auth.js'
const router = Router();

router.get("/usuarios",auth.isLoggedIn, getUsuarios);

router.get("/usuarios/:id",auth.isLoggedIn, getUsuario);

router.put("/usuarios/:id",auth.isLoggedIn, updateUsuario);

router.delete("/usuarios/:id",auth.isLoggedIn, deleteUsuario);

router.get("/userinfoC/:id",auth.isLoggedIn, getUsuarioFullinfo);

router.get("/userinfo",auth.isLoggedIn, getUserinfo);


export default router;