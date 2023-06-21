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
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({
    secret: "biomedicalnodesession",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(db.database),
    cookie: {
      secure: false, // Si estás usando HTTPS, establece esta opción en true; de lo contrario, déjala en false
      maxAge: 24 * 60 * 60 * 1000, // Tiempo de vida de la cookie en milisegundos (aquí se establece a 24 horas)
      // Aquí puedes configurar otras opciones de cookie, como el dominio, la ruta, etc.
    },
  })
);
app.use(morgan("dev"));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(passportlib);



app.use(authRoutes);

app.use(citasRoutes);
app.use(historialRoutes);
app.use(dataRoutes);
app.use(usuariosRoutes);
app.use((req, res, next) => {
  console.log(req.user, "aaaaaaaaa")
  app.locals.user = req.user;
  next();
});

export default app;
