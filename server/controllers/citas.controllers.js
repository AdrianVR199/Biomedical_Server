import { pool } from "../db.js";

export const getCitas = (req, res) => {
  res.send("obteniendo citas");
};

export const getCita = (req, res) => {
  res.send("obteniendo una cita");
};

export const createCita = async (req, res) => {
  const {
    tipo_cita,
    motivo_consulta,
    estado_asistencia,
    id_paciente,
    id_doctor,
  } = req.body;
  const result = await pool.query(
    "INSERT INTO citas(tipo_cita,motivo_consulta,estado_asistencia,id_paciente,id_doctor) VALUES(?,?,?,?,?)",
    [tipo_cita, motivo_consulta, estado_asistencia, id_paciente, id_doctor]
  );
  console.log(result);
  res.send("creando citas");
};

export const updateCita = (req, res) => {
  res.send("actualizando cita");
};

export const deleteCita = (req, res) => {
  res.send("eliminando cita");
};
