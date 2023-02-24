import { Router } from "express";

const router = Router();

export const db = {
  database: {
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "12345",
    database: "biomedical_group_app",
  },
};

export default router;
