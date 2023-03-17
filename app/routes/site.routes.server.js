/*

File name: site.routes.server.js

Purpose: 
  All the routes related to the site controller
  This will manage general site navigation and handling

*/

import { Router } from "express";

import { homePage } from "../controllers/site.controller.server.js";

const router = Router();

router.get("/", homePage);

export default router;
