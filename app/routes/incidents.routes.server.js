/*

File name: incidents.routes.server.js

Purpose: 
  All the routes related to the incidents controller
  This will manage incidents


*/
import { Router } from "express";
import { AddTicketsPage, ProcessTicketsAddPage, DisplayIncidentsEditPage, ProcessIncidentsEditPage, ProcessIncidentsDeletePage,SearchIncidents, GenerateIncidentReport } from "../controllers/incidents.controller.server.js";
import { RoleGuard } from "../utils/utils.js"; // Change this line

const router = Router();

router.get('/add', RoleGuard(["programmer", "CEO", "incidentsManager","leadDeveloper"]), AddTicketsPage);
router.post('/add', RoleGuard(["programmer", "CEO", "incidentsManager","leadDeveloper"]), ProcessTicketsAddPage);
router.get('/edit/:id', RoleGuard(["programmer", "CEO", "incidentsManager","leadDeveloper"]), DisplayIncidentsEditPage);
router.post('/edit/:id', RoleGuard(["programmer", "CEO", "incidentsManager","leadDeveloper"]), ProcessIncidentsEditPage);
router.get('/delete/:id', RoleGuard(["programmer", "CEO", "incidentsManager","leadDeveloper"]), ProcessIncidentsDeletePage);

router.get('/search', SearchIncidents);
router.get('/incidents/report/:id', GenerateIncidentReport);

export default router;
