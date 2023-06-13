import pool from "../db.js";
import { fromBinaryUUID } from "binary-uuid";

export const getHistorial = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT BIN_TO_UUID(h.hist_id) as historial_id,h.fecha_reg_hist,h.descripcion,BIN_TO_UUID(h.id_paciente) as id_paciente, BIN_TO_UUID(h.id_doctor) as id_doctor, p.nombre_completo as nombre_paciente,m.nombre_completo as nombre_medico FROM historiales_clinicos h JOIN usuarios p ON h.id_paciente=p.usuario_id JOIN usuarios m ON h.id_doctor=m.usuario_id WHERE BIN_TO_UUID(h.id_paciente)=?",
      [req.params.id]
    );
    if (result.length === 0)
      return res.status(404).json({ message: "historial no encontrado" });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const createHistorial = async (req, res) => {
  const idSesion = fromBinaryUUID(req.user.usuario_id);
  try {
    const { descripcion, id_doctor } = req.body;
    const newLink = { descripcion, id_paciente: idSesion, id_doctor };
    const result = await pool.query(
      "INSERT INTO historiales_clinicos (descripcion, id_paciente, id_doctor) VALUES (?,UUID_TO_BIN(?),?)",
      [newLink.descripcion, newLink.id_paciente, newLink.id_doctor]
    );

    res.send("creando historial");
  } catch {
    return res.status(500).json({ message: error.message });
  }
};
export const updateHistorial = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE historiales_clinicos SET fecha_reg_hist=?, descripcion=?,id_doctor=UUID_TO_BIN(?) WHERE BIN_TO_UUID(id_paciente) = ?",
      [
        req.body.fecha_reg_hist,
        req.body.descripcion,
        req.body.id_doctor,
        req.params.id,
      ]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getHistoriales = async (req, res) => {
  try {
    const idSesion = fromBinaryUUID(req.user.usuario_id);
    const [result] = await pool.query(
      "SELECT BIN_TO_UUID(hist_id)as'historial_id', fecha_reg_hist,descripcion,BIN_TO_UUID(id_paciente) as 'id_paciente',BIN_TO_UUID(id_doctor) as 'id_doctor' FROM historiales_clinicos WHERE BIN_TO_UUID(id_paciente) = ? ORDER BY fecha_reg_hist ASC",
      [idSesion]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "el usuario no historial" });
    } else {
      res.json(result);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteHistorial = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM historiales_clinicos WHERE BIN_TO_UUID(hist_id)=?",
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "cita no encontrada" });
    } else {
      return res.sendStatus(204);
    }
  } catch {
    return res.status(500).json({ message: error.message });
  }
};
