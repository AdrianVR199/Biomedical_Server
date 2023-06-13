import pool from "../db.js";

export const getDepartamentos = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM departamentos");
    if (result.length === 0) {
      return res.status(404).json({ message: "el usuario no tiene citas" });
    } else {
      res.json(result);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCiudades = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * from ciudades WHERE id_departamento=?",
      [req.params.id]
    );
    if (result.length === 0)
      return res.status(404).json({ message: "cita no encontrada" });
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCorreos = async (req, res) => {
  try {
    const { correo } = req.body;

    const result = await pool.query(
      "SELECT correo from usuarios WHERE correo=?",
      [correo]
    );

    if (result[0].length === 0) {
      return res.json({ message: "sigue" });
    } else {
      return res.json({ message: "ocupado" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
