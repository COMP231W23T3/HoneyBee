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
         ProcessIncidentsDeletePage } from "../controllers/incidents.controller.server.js";

const router = Router();

router.get('/add',AddTicketsPage);
router.post('/add', ProcessTicketsAddPage);
router.get('/edit/:id', DisplayIncidentsEditPage);
router.post('/edit/:id', ProcessIncidentsEditPage);
router.get('/delete/:id', ProcessIncidentsDeletePage);

export default router;
