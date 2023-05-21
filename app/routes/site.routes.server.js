/*

File name: site.routes.server.js

Purpose: 
  All the routes related to the site controller
  This will manage general site navigation and handling


*/
import { Router } from "express";
import { contactPage, dashboardPage, ticketsPage, } from "../controllers/site.controller.server.js";
import { RoleGuard } from "../utils/utils.js"; // Change this line

const router = Router();

router.get("/contact", contactPage);
router.get("/dashboard", dashboardPage);
router.get("/tickets/:view", ticketsPage);

router.get("/tickets", ticketsPage);

export default router;
