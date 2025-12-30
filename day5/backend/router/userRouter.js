import express from "express";
import { signup, login } from "../controller/userController.js";
import {
  signUpValidation,
  loginValidation,
} from "../middleware/authValidation.js";
import ensureAuthenticated from "../middleware/protected.js";

const router = express.Router();

router.post("/signup", signUpValidation, signup);
router.post("/login", loginValidation, login);
router.get("/profile", ensureAuthenticated, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed",
    user: req.user,
  });
});

export default router;
