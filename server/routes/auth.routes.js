import { Router } from "express";
import passport from "passport";
import { signIn, signUp, getPerfil } from "../controllers/auth.controllers.js";
const router = Router();

router.post(
  "/auth/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);
router.post("/auth/signin", signIn);
router.get("/auth/perfil", getPerfil);
export default router;
