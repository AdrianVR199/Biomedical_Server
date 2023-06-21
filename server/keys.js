import { Router } from "express";

const router = Router();

// export const db = {
//   database: {
//     connectionLimit: 10,
//     host: "localhost",
//     user: "root",
//     password: "12345",
//     database: "biomedical_group_app",
//   },
// };

export const db = {
  database: {
    connectionLimit: 10,
    host: "database-biomedical-g.ctve6mdscvkw.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "BMG1999.dbweb",
    database: "biomedical_group_app",
  },
};

export default router;
