import pool from "../db.js";
import { createBinaryUUID, fromBinaryUUID } from "binary-uuid";

export const getCitas = async (req, res) => {
  //console.log(fromBinaryUUID(req.user.usuario_id))
  try {
    const idSesion = fromBinaryUUID(req.user.usuario_id);
    //console.log(idSesion)

    const [result] = await pool.query(
      "SELECT BIN_TO_UUID(cita_id) as 'cita_id',c.fecha_reg,c.hora_reg,c.tipo_cita,c.motivo_consulta,c.estado_asistencia,BIN_TO_UUID(c.id_paciente) as 'id_paciente',BIN_TO_UUID(c.id_doctor) as 'id_doctor',p.nombre_completo AS nombre_paciente, m.nombre_completo AS nombre_medico FROM citas c JOIN usuarios p ON c.id_paciente = p.usuario_id JOIN usuarios m ON c.id_doctor = m.usuario_id WHERE BIN_TO_UUID(id_paciente) = ? ORDER BY fecha_reg ASC",
      [req.user.usuario_id]
    );
    if (result.length === 0) {
      //return res.status(404).json({ message: "el usuario no tiene citas" });
      res.json(result);
      console.log(req.user.usuario_id,"citas enviadas vacias")
    } else {
      res.json(result);
      console.log(req.user.usuario_id,"citas enviadas")
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getCitasC = async (req, res) => {
  //console.log(fromBinaryUUID(req.user.usuario_id))
  try {
    //const idSesion = fromBinaryUUID(req.user.usuario_id);
    //console.log(idSesion)

    const [result] = await pool.query(
      "SELECT BIN_TO_UUID(cita_id) as 'cita_id',c.fecha_reg,c.hora_reg,c.tipo_cita,c.motivo_consulta,c.estado_asistencia,BIN_TO_UUID(c.id_paciente) as 'id_paciente',BIN_TO_UUID(c.id_doctor) as 'id_doctor',p.nombre_completo AS nombre_paciente, m.nombre_completo AS nombre_medico FROM citas c JOIN usuarios p ON c.id_paciente = p.usuario_id JOIN usuarios m ON c.id_doctor = m.usuario_id ORDER BY fecha_reg ASC",
     
    );
    if (result.length === 0) {
      //return res.status(404).json({ message: "el usuario no tiene citas" });
      res.json(result);
      console.log(req.user.usuario_id,"citas enviadas vacias")
    } else {
      res.json(result);
      console.log(req.user.usuario_id,"citas enviadas")
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCita = async (req, res) => {
  //console.log(req)
  try {
    console.log(req.params.id,"lo que trae el front")
    const [result] = await pool.query(
      "SELECT BIN_TO_UUID(cita_id) as 'cita_id',c.fecha_reg,c.hora_reg,c.tipo_cita,c.motivo_consulta,c.estado_asistencia,BIN_TO_UUID(c.id_paciente) as 'id_paciente',BIN_TO_UUID(c.id_doctor) as 'id_doctor',p.nombre_completo AS nombre_paciente, m.nombre_completo AS nombre_medico FROM citas c JOIN usuarios p ON c.id_paciente = p.usuario_id JOIN usuarios m ON c.id_doctor = m.usuario_id WHERE BIN_TO_UUID(cita_id)=?",
      [req.params.id]
    );
    if (result.length === 0)
      return res.status(404).json({ message: "cita no encontrada" });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCita = async (req, res) => {
  const idSesion = fromBinaryUUID(req.user.usuario_id);
  try {
    const { fecha_reg,hora_reg,tipo_cita, motivo_consulta, estado_asistencia, id_doctor } =
      req.body;
    const newLink = {
      fecha_reg,
      hora_reg,
      tipo_cita,
      motivo_consulta,
      estado_asistencia,
      id_paciente: req.user.usuario_id,
      id_doctor,
    };

    const result = await pool.query(
      "INSERT INTO citas (fecha_reg,hora_reg,tipo_cita,motivo_consulta, estado_asistencia,id_paciente,id_doctor) VALUES (?,?,?,?,?,UUID_TO_BIN(?),UUID_TO_BIN(?))",
      [
        newLink.fecha_reg,
        newLink.hora_reg,
        newLink.tipo_cita,
        newLink.motivo_consulta,
        newLink.estado_asistencia,
        newLink.id_paciente,
        newLink.id_doctor,
      ]
    );
    console.log(result);
    res.send("creando citas");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCita = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE citas SET ? WHERE BIN_TO_UUID(cita_id) = ?",
      [req.body, req.params.id]
    );
    res.json(result);
  } catch {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCita = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM citas WHERE BIN_TO_UUID(cita_id)=?",
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "cita no encontrada" });
    } else {
      console.log("siseborro")

      return res.sendStatus(204);
    }
  } catch {
    return res.status(500).json({ message: error.message });
  }
};

export const getHorasCitas = async (req, res) => {
  try {
    //console.log(req.body, "informacion recibida del front")
    const [result] = await pool.query(
      "SELECT hora_reg from citas WHERE BIN_TO_UUID(id_doctor)=? AND fecha_reg=?",
      [req.body.id_doctor,req.body.fecha_reg]
    );
    if (result.length === 0) {
      res.json(result);
      console.log("no hay horarios para ese dia con ese medico")
    } else {
      res.json(result);
      console.log(result,"enviando horarios")
    }
  } catch {
    return res.status(500).json({ message: error.message });
  }
};
