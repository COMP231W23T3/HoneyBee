/*

File name: site.routes.server.js

Purpose: 
  All the routes related to the site controller
  This will manage general site navigation and handling

*/

import { Router } from "express";

import {
  addTicketsPage,
  contactPage,
  dashboardPage,
  homePage,
  ticketsPage,
} from "../controllers/site.controller.server.js";

const router = Router();

router.get("/", homePage);
router.get("/add", addTicketsPage);
router.get("/contact", contactPage);
router.get("/dashboard", dashboardPage);
router.get("/tickets", ticketsPage);

export default router;
