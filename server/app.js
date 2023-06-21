import express from "express";
import cors from "cors";
import citasRoutes from "./routes/citas.routes.js";
import usuariosRoutes from "./routes/usuario.routes.js";
import historialRoutes from "./routes/historiales.routes.js";
import dataRoutes from "./routes/data.routes.js";
import authRoutes from "./routes/auth.routes.js";
import passport from "passport";
import bodyParser from "body-parser";
import passportlib from "./lib/passport.js";
import morgan from "morgan";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import { db } from "./keys.js";

//const index = Router();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true,  allowedHeaders: ['Content-Type'] }));

app.use(
  session({
    secret: "biomedicalnodesession",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(db.database),
  })
);
app.use(morgan("dev"));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(passportlib);

app.use(authRoutes);

app.use((req, res, next) => {
  console.log(req.user, "aaaaaaaaa")
  app.locals.user = req.user;
  next();
});

app.use(citasRoutes);
app.use(historialRoutes);
app.use(dataRoutes);

app.use(usuariosRoutes);


export default app;
