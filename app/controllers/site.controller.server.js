/*

File name: site.controller.server.js

Purpose: 
  Controllers to manage general site navigation and handling


*/

export function contactPage(req, res, next) {
  res.render("index", {
    title: "Contact",
    page: "contact",
  });
}

export function dashboardPage(req, res, next) {
  res.render("index", {
    title: "Dashboard",
    page: "dashboard",
  });
}

export function ticketsPage(req, res, next) {
  res.render("index", {
    title: "Tickets",
    page: "tickets",
  });
}
