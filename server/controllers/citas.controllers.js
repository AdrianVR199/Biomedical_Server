import { pool } from "../db.js";

export const getCitas = async (req, res) => {
  const [result] = await pool.query(
    "SELECT * FROM citas ORDER BY hora_reg ASC"
  );
  res.json(result);
};

export const getCita = async (req, res) => {
  //console.log(req)
  const [result] = await pool.query("SELECT * FROM citas WHERE BIN_TO_UUID(cita_id)=?", [req.params.id,]);
  res.json(result[0]);
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
