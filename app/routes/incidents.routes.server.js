/*

File name: incidents.routes.server.js

Purpose: 
  All the routes related to the incidents controller
  This will manage incidents


*/
import { Router } from "express";
import { AddTicketsPage,
    ProcessTicketsAddPage,
    DisplayIncidentsEditPage,
    ProcessIncidentsEditPage,
    ProcessIncidentsDeletePage,
    SearchIncidents,
    GenerateIncidentReport,
    GetIncidentStatusCounts } from "../controllers/incidents.controller.server.js";
import { RoleGuard } from "../utils/utils.js"; // Change this line

const router = Router();

router.get('/add', RoleGuard(["programmer", "ceo", "incidentsManager","leadDeveloper"]), AddTicketsPage);
router.post('/add', RoleGuard(["programmer", "ceo", "incidentsManager","leadDeveloper"]), ProcessTicketsAddPage);
router.get('/edit/:id', RoleGuard(["programmer", "ceo", "incidentsManager","leadDeveloper"]), DisplayIncidentsEditPage);
router.post('/edit/:id', RoleGuard(["programmer", "ceo", "incidentsManager","leadDeveloper"]), ProcessIncidentsEditPage);
router.get('/delete/:id', RoleGuard(["programmer", "ceo", "incidentsManager","leadDeveloper"]), ProcessIncidentsDeletePage);

router.get('/search', SearchIncidents);
router.get('/incidents/report/:id', GenerateIncidentReport);
router.get('/incidents/status_counts', GetIncidentStatusCounts);

export default router;
