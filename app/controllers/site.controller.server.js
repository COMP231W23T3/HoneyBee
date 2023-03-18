/*

File name: site.controller.server.js

Purpose: 
  Controllers to manage general site navigation and handling


*/

export function homePage(req, res, next) {
res.render("index", {
    title: "HoneyBee Ticketing Service",
    page: "home",
  });
}

export function addTicketsPage(req, res, next) {
  res.render("index", {
    title: "Add Ticket",
    page: "addticket",
  });
}

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

export function registerPage(req, res, next) {
  res.render("index", {
    title: "Register",
    page: "register",
  });
}

export function ticketsPage(req, res, next) {
  res.render("index", {
    title: "Tickets",
    page: "tickets",
  });
}
