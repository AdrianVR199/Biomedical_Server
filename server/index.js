import express from "express";
import { PORT } from "./config.js";
import citasRoutes from "./routes/citas.routes.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();
app.use(citasRoutes);
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
