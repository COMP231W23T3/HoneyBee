/*

File name: site.controller.server.js

Purpose: 
  Controllers to manage general site navigation and handling

*/
import incidentsModel from "../models/incidents.js";
import { userName, administrator } from "../utils/utils.js";



export function contactPage(req, res, next) {
  let userType = req.user ? req.user.userType : "programmer";
  res.render("index", {
    title: "Contact",
    page: "contact",
    displayName: userName(req),
    userType: userType,

  });
}

export function dashboardPage(req, res, next) {
  let userType = req.user ? req.user.userType : "programmer";

  res.render("index", {
    title: "Dashboard",
    page: "dashboard",
    displayName: userName(req),
    userType: userType
  });
}
export function ticketsPage(req, res, next) {
  let viewMode = req.params.view;


  incidentsModel.find(function(err, incidentsCollection) {
    if(err){
      console.error(err);
      res.end(err);
    }

    // Set a default value for userType if it is undefined
    let userType = req.user ? req.user.userType : "programmer";

    res.render("index", {
      title: "Tickets",
      page: "tickets",
      incidents: incidentsCollection,
      displayName: userName(req),
      view: viewMode,
      userType: userType,
    });
  });
}
