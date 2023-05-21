/*

File name: incidents.routes.server.js

Purpose: 
  All the routes related to the incidents controller
  This will manage incidents


*/
import { Router } from "express";
import { AddTicketsPage, ProcessTicketsAddPage, DisplayIncidentsEditPage, ProcessIncidentsEditPage, ProcessIncidentsDeletePage } from "../controllers/incidents.controller.server.js";
import { RoleGuard } from "../utils/utils.js"; // Change this line

const router = Router();

router.get('/add', RoleGuard(["programmer", "CEO", "IncidentsManager","leadDeveloper"]), AddTicketsPage);
router.post('/add', RoleGuard(["programmer", "CEO", "IncidentsManager","leadDeveloper"]), ProcessTicketsAddPage);
router.get('/edit/:id', RoleGuard(["programmer", "CEO", "IncidentsManager","leadDeveloper"]), DisplayIncidentsEditPage);
router.post('/edit/:id', RoleGuard(["programmer", "CEO", "IncidentsManager","leadDeveloper"]), ProcessIncidentsEditPage);
router.get('/delete/:id', RoleGuard(["programmer", "CEO", "IncidentsManager","leadDeveloper"]), ProcessIncidentsDeletePage);

export default router;
