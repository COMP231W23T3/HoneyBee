/*

File name: site.controller.server.js

Purpose: 
  Controllers to manage general site navigation and handling


*/
import { userName } from "../utils/utils.js";
import incidentsModel from "../models/incidents.js";


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
  incidentsModel.find(function(err, incidentsCollection) {
    if(err){
      console.error(err);
      res.end(err);
    }

  res.render("index", {
    title: "Tickets",
    page: "tickets",
    incidents: incidentsCollection,
    displayName: userName(req)
  });

});
}
