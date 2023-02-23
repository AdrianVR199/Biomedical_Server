import express from "express";
import { PORT } from "./config.js";
import citasRoutes from "./routes/citas.routes.js";
import indexRoutes from "./routes/index.routes.js";
import historialRoutes from "./routes/historiales.routes.js";

const app = express();

app.use(express.json())
app.use(indexRoutes);

app.use(citasRoutes);
app.use(historialRoutes);
app.listen(PORT);

console.log(`Server is running on port ${PORT}`);
