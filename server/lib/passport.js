import { Router } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import helpers from "./helpers.js";
import pool from "../db.js";
import { createBinaryUUID } from "binary-uuid";
import { fromBinaryUUID } from "binary-uuid";
const router = Router();

//local sign in
passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "correo",
      passwordField: "contraseña",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const rows = await pool.query("SELECT BIN_TO_UUID(u.usuario_id) as usuario_id, u.nombre_completo, u.correo, u.contraseña, u.tipo_identificacion, u.num_identificacion, u.genero, u.fecha_nacimiento, u.num_tel_celular, u.num_tel_fijo,u.direccion, u.nacionalidad, u.id_tipo_usuario, u.id_imagen,u.fecha_crea_usuario , u.id_ciudad_nac,u.id_ciudad_resi, c.nombre_ciudad as ciudad_nac,  d.nombre_departamento as dep_nac,d.departamento_id as dep_nac_id, p.nombre_pais as pais_nac, c2.nombre_ciudad as ciudad_res, d2.nombre_departamento as depa_res, d2.departamento_id as depa_res_id, p2.nombre_pais as pais_res FROM usuarios u JOIN ciudades c ON u.id_ciudad_nac=c.ciudad_id JOIN departamentos d ON c.id_departamento=d.departamento_id JOIN paises p ON d.id_pais=p.pais_id JOIN ciudades c2 ON u.id_ciudad_resi=c2.ciudad_id JOIN departamentos d2 ON c2.id_departamento=d2.departamento_id JOIN paises p2 ON d2.id_pais=p2.pais_id WHERE u.correo=?", [
        username,
      ]);

      if (rows[0].length > 0) {
        const userextract = rows[0];
        const user = userextract[0];
        const validPassword = await helpers.matchPassword(
          password,
          user.contraseña
        );
        if (validPassword) {
          //user.usuario_id = fromBinaryUUID(user.usuario_id);

          done(null, user);
          console.log(user, "usuario login");
        } else {
          const info = 1;
          done(null, false, { message: "Contraseña incorrecta" });
        }
      } else {
        return done(null, false, { message: "usuario no existe" });
      }
    }
  )
);

//local sign up
passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "correo",
      passwordField: "contraseña",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const binaryID = createBinaryUUID();
      const jbuff = binaryID.buffer.toJSON();
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
        usuario_id: binaryID.uuid,
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
      const verifyUser = await pool.query(
        "SELECT * FROM usuarios WHERE correo =?",
        [newUser.correo]
      );

      if (verifyUser[0].length === 0) {
        try {
          newUser.contraseña = await helpers.encryptPassword(password);

          const result = await pool.query(
            "INSERT INTO usuarios (usuario_id,nombre_completo,correo,contraseña,tipo_identificacion,num_identificacion,genero,fecha_nacimiento,num_tel_celular,num_tel_fijo,direccion,nacionalidad,id_ciudad_nac,id_ciudad_resi,id_tipo_usuario,id_imagen) VALUES (UUID_TO_BIN(?),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
              newUser.usuario_id,
              newUser.nombre_completo,
              newUser.correo,
              newUser.contraseña,
              newUser.tipo_identificacion,
              newUser.num_identificacion,
              newUser.genero,
              newUser.fecha_nacimiento,
              newUser.num_tel_celular,
              newUser.num_tel_fijo,
              newUser.direccion,
              newUser.nacionalidad,
              newUser.id_ciudad_nac,
              newUser.id_ciudad_resi,
              newUser.id_tipo_usuario,
              newUser.id_imagen,
            ]
          );
          const createH = await pool.query(
            "INSERT INTO historiales_clinicos (descripcion, id_paciente, id_doctor) VALUES (?,UUID_TO_BIN(?),?)",
            ["1", newUser.usuario_id, "2"]
          );
          const rows2 = await pool.query("SELECT BIN_TO_UUID(u.usuario_id) as usuario_id, u.nombre_completo, u.correo, u.contraseña, u.tipo_identificacion, u.num_identificacion, u.genero, u.fecha_nacimiento, u.num_tel_celular, u.num_tel_fijo,u.direccion, u.nacionalidad, u.id_tipo_usuario, u.id_imagen,u.fecha_crea_usuario , u.id_ciudad_nac,u.id_ciudad_resi, c.nombre_ciudad as ciudad_nac,  d.nombre_departamento as dep_nac,d.departamento_id as dep_nac_id, p.nombre_pais as pais_nac, c2.nombre_ciudad as ciudad_res, d2.nombre_departamento as depa_res, d2.departamento_id as depa_res_id, p2.nombre_pais as pais_res FROM usuarios u JOIN ciudades c ON u.id_ciudad_nac=c.ciudad_id JOIN departamentos d ON c.id_departamento=d.departamento_id JOIN paises p ON d.id_pais=p.pais_id JOIN ciudades c2 ON u.id_ciudad_resi=c2.ciudad_id JOIN departamentos d2 ON c2.id_departamento=d2.departamento_id JOIN paises p2 ON d2.id_pais=p2.pais_id WHERE u.correo=?", [
            newUser.correo,
          ]);
          const userextract1 = rows2[0];
        const user = userextract1[0];
          console.log(rows2,user, "usuario traido signup")
          return done(null, user);
        } catch (err) {
          return done(null, false, {
            message: "Hay datos obligatorios que faltan",
          });
        }
      } else {
        return done(null, false, { message: "Este correo ya esta registrado" });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log(user, user.usuario_id, "usuario serialize");
  process.nextTick(function() {
    done(null, user.usuario_id);
  });
});

passport.deserializeUser( (usuario_id, done)=> {
  process.nextTick( async function() {
    try {
      console.log(usuario_id, "usuario deseserialize");
      const ddd1 = "ef985df0-c43e-11ed-a21f-e14ec68d90e3";
      const ddd = "6c951ea0-c43b-11ed-b78e-27beb8bef137";
      const rows = await pool.query(
        "SELECT BIN_TO_UUID(u.usuario_id) as usuario_id, u.nombre_completo, u.correo, u.contraseña, u.tipo_identificacion, u.num_identificacion, u.genero, u.fecha_nacimiento, u.num_tel_celular, u.num_tel_fijo,u.direccion, u.nacionalidad, u.id_tipo_usuario, u.id_imagen,u.fecha_crea_usuario , u.id_ciudad_nac,u.id_ciudad_resi, c.nombre_ciudad as ciudad_nac,  d.nombre_departamento as dep_nac,d.departamento_id as dep_nac_id, p.nombre_pais as pais_nac, c2.nombre_ciudad as ciudad_res, d2.nombre_departamento as depa_res, d2.departamento_id as depa_res_id, p2.nombre_pais as pais_res FROM usuarios u JOIN ciudades c ON u.id_ciudad_nac=c.ciudad_id JOIN departamentos d ON c.id_departamento=d.departamento_id JOIN paises p ON d.id_pais=p.pais_id JOIN ciudades c2 ON u.id_ciudad_resi=c2.ciudad_id JOIN departamentos d2 ON c2.id_departamento=d2.departamento_id JOIN paises p2 ON d2.id_pais=p2.pais_id   WHERE BIN_TO_UUID(usuario_id)=?",
        usuario_id
      );
  
      const row = rows[0];
      const row1 = row[0];
      console.log(row, row1, "consultas");
      done(null, row1);
    } catch (err) {
      done(err);
    }
  });
 
});

export default router;
