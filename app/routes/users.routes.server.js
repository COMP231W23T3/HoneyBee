/*

File name: users.routes.server.js

Purpose: 
  All the routes related to the users controller
  This will manage handling around users
  
  

*/
import { Router } from "express";

import {
  loginPage,
  accountManagementPage,
  ProcessAccountManagement,
  ProcessLogin,
  ProcessLogout,
  ProcessRegister,
  registerPage,
} from "../controllers/users.controller.server.js";
import { RoleGuard } from "../utils/utils.js"; // Change this line

const router = Router();

router.get("/", loginPage);
router.post("/", ProcessLogin);
router.get("/accountmanagement/:id",RoleGuard(["programmer", "ceo", "incidentsManager","leadDeveloper","supportAgent"]), accountManagementPage);
router.post("/accountmanagement/:id",RoleGuard(["programmer", "ceo", "incidentsManager","leadDeveloper","supportAgent"]),  ProcessAccountManagement);
router.get("/login", loginPage);
router.post("/login", ProcessLogin);
router.get("/register", registerPage);
router.post("/register", ProcessRegister);
router.get("/logout", ProcessLogout);

export default router;

