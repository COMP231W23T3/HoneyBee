/*
File name: users.routes.server.js
Purpose: 
  All the routes related to the users controller
  This will manage handling around users
*/
import { Router } from "express";

import {
  loginPage,
  ProcessLogin,
  ProcessLogout,
  ProcessRegister,
  registerPage,
} from "../controllers/users.controller.server.js";

const router = Router();

router.get("/login", loginPage);
router.post("/login", ProcessLogin);
router.get("/register", registerPage);
router.post("/register", ProcessRegister);
router.get("logout", ProcessLogout);

export default router;