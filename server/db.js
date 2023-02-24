import { createPool } from "mysql2/promise";
import { db } from "./keys.js";

const pool = createPool(db.database);

export default pool;
