import express from "express";
import { PORT } from "./config.js";
import citasRoutes from "./routes/citas.routes.js";
import historialRoutes from "./routes/historiales.routes.js";
import authRoutes from "./routes/auth.routes.js";
import passport from "passport";
import passportlib from "./lib/passport.js";
import morgan from "morgan";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import { db } from "./keys.js";

const app = express();
app.use(passportlib);

app.use(
  session({
    secret: "biomedicalnodesession",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(db.database),
  })
);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(citasRoutes);
app.use(historialRoutes);
app.use(authRoutes);
app.listen(PORT);

console.log(`Server is running on port ${PORT}`);
