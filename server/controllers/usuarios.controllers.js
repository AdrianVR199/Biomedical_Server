import pool from "../db.js";

export const getUsuarios = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT BIN_TO_UUID(u.usuario_id) as usuario_id, u.nombre_completo, u.correo, u.contraseña, u.tipo_identificacion, u.num_identificacion, u.genero, u.fecha_nacimiento, u.num_tel_celular, u.num_tel_fijo,u.direccion, u.nacionalidad, u.id_tipo_usuario, u.id_imagen,u.fecha_crea_usuario , c.nombre_ciudad as ciudad_nac,  d.nombre_departamento as dep_nac, p.nombre_pais as pais_nac, c2.nombre_ciudad as ciudad_res, d2.nombre_departamento as depa_res, p2.nombre_pais as pais_res FROM usuarios u JOIN ciudades c ON u.id_ciudad_nac=c.ciudad_id JOIN departamentos d ON c.id_departamento=d.departamento_id JOIN paises p ON d.id_pais=p.pais_id JOIN ciudades c2 ON u.id_ciudad_resi=c2.ciudad_id JOIN departamentos d2 ON c2.id_departamento=d2.departamento_id JOIN paises p2 ON d2.id_pais=p2.pais_id WHERE u.id_tipo_usuario=1 ORDER BY fecha_crea_usuario ASC "
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsuario = async (req, res) => {
  try {
    //throw new Error("error de conexion");
    const [result] = await pool.query(
      "SELECT * FROM usuarios WHERE BIN_TO_UUID(usuario_id) = ?",
      [req.params.id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateUsuario = async (req, res) => {
  try {
    //throw new Error("error de conexion");

    const result = await pool.query(
      "UPDATE usuarios SET ? WHERE BIN_TO_UUID(usuario_id) = ?",
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    //throw new Error("error de conexion");
    const [result] = await pool.query(
      "DELETE FROM usuarios WHERE BIN_TO_UUID(usuario_id)  = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsuarioFullinfo = async (req,res)=>{
  try {
    //throw new Error("error de conexion");
    const [result] = await pool.query(
      "SELECT BIN_TO_UUID(u.usuario_id) as user_id, u.nombre_completo, u.correo, u.contraseña, u.tipo_identificacion, u.num_identificacion, u.genero, u.fecha_nacimiento, u.num_tel_celular, u.num_tel_fijo,u.direccion, u.nacionalidad, u.id_tipo_usuario, u.id_imagen,u.fecha_crea_usuario , u.id_ciudad_nac,u.id_ciudad_resi, c.nombre_ciudad as ciudad_nac,  d.nombre_departamento as dep_nac,d.departamento_id as dep_nac_id, p.nombre_pais as pais_nac, c2.nombre_ciudad as ciudad_res, d2.nombre_departamento as depa_res, d2.departamento_id as depa_res_id, p2.nombre_pais as pais_res FROM usuarios u JOIN ciudades c ON u.id_ciudad_nac=c.ciudad_id JOIN departamentos d ON c.id_departamento=d.departamento_id JOIN paises p ON d.id_pais=p.pais_id JOIN ciudades c2 ON u.id_ciudad_resi=c2.ciudad_id JOIN departamentos d2 ON c2.id_departamento=d2.departamento_id JOIN paises p2 ON d2.id_pais=p2.pais_id   WHERE BIN_TO_UUID(usuario_id) = ?",
      [req.params.id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getUserinfo= async (req,res)=>{
  res.send(req.user);
};