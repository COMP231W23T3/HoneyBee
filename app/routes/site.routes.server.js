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

router.get("/contact", RoleGuard(["programmer", "ceo", "incidentsManager","leadDeveloper","supportAgent"]), contactPage);
router.get("/dashboard", RoleGuard(["programmer", "ceo", "incidentsManager","leadDeveloper","supportAgent"]), dashboardPage);
router.get("/tickets/:view",RoleGuard(["programmer", "ceo", "incidentsManager","leadDeveloper","supportAgent"]), ticketsPage);

router.get("/tickets", RoleGuard(["programmer", "ceo", "incidentsManager","leadDeveloper","supportAgent"]), ticketsPage);

export default router;
