import { Router } from "express";

const router = Router();

export const auth = {
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        console.log("no autorizado")
        return res.redirect('/signin');
    }
};
export default router;

