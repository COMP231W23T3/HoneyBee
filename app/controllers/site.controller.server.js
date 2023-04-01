/*

File name: site.controller.server.js

Purpose: 
  Controllers to manage general site navigation and handling


*/
import { userName } from "../utils/utils.js";

export function contactPage(req, res, next) {
  res.render("index", {
    title: "Contact",
    page: "contact",
    displayName: userName(req),
  });
}

export function dashboardPage(req, res, next) {
  res.render("index", {
    title: "Dashboard",
    page: "dashboard",
    displayName: userName(req),
  });
}

export function ticketsPage(req, res, next) {
  res.render("index", {
    title: "Tickets",
    page: "tickets",
    displayName: userName(req),
  });
}
