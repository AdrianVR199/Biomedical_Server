import { pool } from "../db.js";

export const getHistoriales = async (req, res) => {
  const [result] = await pool.query(
    "SELECT BIN_TO_UUID(hist_id)as'historial_id', fecha_reg_hist,descripcion,BIN_TO_UUID(id_paciente) as 'id_paciente',BIN_TO_UUID(id_doctor) as 'id_doctor' FROM historiales_clinicos ORDER BY fecha_reg_hist ASC"
  );
  res.json(result);
};
export const getHistorial = async (req, res) => {
  const [result] = await pool.query(
    "SELECT BIN_TO_UUID(hist_id)as'historial_id', fecha_reg_hist,descripcion,BIN_TO_UUID(id_paciente) as 'id_paciente',BIN_TO_UUID(id_doctor) as 'id_doctor' FROM historiales_clinicos WHERE BIN_TO_UUID(hist_id)=?",
    [req.params.id]
  );
  if (result.length === 0)
    return res.status(404).json({ message: "historial no encontrado" });
  res.json(result[0]);
};
export const createHistorial = async (req, res) => {
  const { descripcion, id_paciente, id_doctor } = req.body;
  const result = await pool.query(
    "INSERT INTO historiales_clinicos(descripcion,id_paciente,id_doctor) VALUES(?,?,?)",
    [descripcion, id_paciente, id_doctor]
  );
  console.log(result);
  res.send("creando historial");
};
export const updateHistorial = async (req, res) => {
  const result = await pool.query(
    "UPDATE historiales_clinicos SET ? WHERE BIN_TO_UUID(hist_id) = ?",
    [req.body, req.params.id]
  );
  res.json(result);
};
export const deleteHistorial = async (req, res) => {
  const [result] = await pool.query(
    "DELETE FROM historiales_clinicos WHERE BIN_TO_UUID(hist_id)=?",
    [req.params.id]
  );
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "cita no encontrada" });
  } else {
    return res.sendStatus(204);
  }
};
