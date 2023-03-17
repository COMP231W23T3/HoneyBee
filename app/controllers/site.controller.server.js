/*

File name: site.controller.server.js

Purpose: 
  Controllers to manage general site navigation and handling


*/

export function homePage(req, res, next) {
  res.render("index");
}
