import pool from "../db.js";

export const getCitas = async (req, res) => {
  const [result] = await pool.query(
    "SELECT BIN_TO_UUID(cita_id) as 'cita_id',fecha_reg,hora_reg,tipo_cita,motivo_consulta,estado_asistencia,BIN_TO_UUID(id_paciente) as 'id_paciente',BIN_TO_UUID(id_doctor) as 'id_doctor' FROM citas ORDER BY hora_reg ASC"
  );
  res.json(result);
};

export const getCita = async (req, res) => {
  //console.log(req)
  const [result] = await pool.query(
    "SELECT BIN_TO_UUID(cita_id) as 'cita_id',fecha_reg,hora_reg,tipo_cita,motivo_consulta,estado_asistencia,BIN_TO_UUID(id_paciente) as 'id_paciente',BIN_TO_UUID(id_doctor) as 'id_doctor' FROM citas WHERE BIN_TO_UUID(cita_id)=?",
    [req.params.id]
  );
  if (result.length === 0)
    return res.status(404).json({ message: "cita no encontrada" });
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
  const newLink = {
    tipo_cita,
    motivo_consulta,
    estado_asistencia,
    id_paciente,
    id_doctor,
  };
  const result = await pool.query("INSERT INTO citas set ?", [newLink]);
  console.log(result);
  res.send("creando citas");
};

export const updateCita = async (req, res) => {
  const result = await pool.query(
    "UPDATE citas SET ? WHERE BIN_TO_UUID(cita_id) = ?",
    [req.body, req.params.id]
  );
  res.json(result);
};

export const deleteCita = async (req, res) => {
  const [result] = await pool.query(
    "DELETE FROM citas WHERE BIN_TO_UUID(cita_id)=?",
    [req.params.id]
  );
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "cita no encontrada" });
  } else {
    return res.sendStatus(204);
  }
};
