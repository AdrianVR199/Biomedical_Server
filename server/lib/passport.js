import { Router } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import helpers from "./helpers.js";
import pool from "../db.js";

const router = Router();

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "correo",
      passwordField: "contraseña",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const {
        nombre_completo,
        tipo_identificacion,
        num_identificacion,
        genero,
        fecha_nacimiento,
        num_tel_celular,
        num_tel_fijo,
        direccion,
        nacionalidad,
        id_ciudad_nac,
        id_ciudad_resi,
        id_tipo_usuario,
        id_imagen,
      } = req.body;
      const newUser = {
        correo: username,
        contraseña: password,
        nombre_completo,
        tipo_identificacion,
        num_identificacion,
        genero,
        fecha_nacimiento,
        num_tel_celular,
        num_tel_fijo,
        direccion,
        nacionalidad,
        id_ciudad_nac,
        id_ciudad_resi,
        id_tipo_usuario,
        id_imagen,
      };
      newUser.contraseña = await helpers.encryptPassword(password);
      const result = await pool.query("INSERT INTO usuarios SET ?", [newUser]);
      console.log(result);
    }
  )
);

//passport.serializeUser((usr,done)=>{})
export default router;
