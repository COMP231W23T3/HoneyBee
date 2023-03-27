/*

File name: incidents.controller.server.js

Purpose: 
  Controllers for incidents - creation, deletion, editting, etc

*/

import incidentsModel from "../models/incidents.js";
import { userName } from "../utils/utils.js";

export function AddTicketsPage(req, res, next) {
  res.render("index", {
    title: "Add Ticket",
    page: "addticket",
    incidents: {},
    displayName: userName(req),
  });
}

export function ProcessTicketsAddPage(req, res, next) {
  let newIncident = incidentsModel({
    description: req.body.description,
    priority: req.body.priority,
    narrative: req.body.narrative,
    customerInformation: req.body.customerInformation,
  });

  incidentsModel.create(newIncident, (err, Incident) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect("/tickets");
  });
}

export function DisplayIncidentsEditPage(req, res, next) {
  let id = req.params.id;

  incidentsModel.findById(id, (err, Incident) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.render("index", {
      title: "Edit Incident",
      page: "editincident",
      incidents: Incident,
      displayName: userName(req),
    });
  });
}

export function ProcessIncidentsEditPage(req, res, next) {
  let id = req.params.id;

  let newIncident = incidentsModel({
    _id: req.body.id,
    description: req.body.description,
    priority: req.body.priority,
    narrative: req.body.narrative,
    customerInformation: req.body.customerInformation,
  });

  incidentsModel.updateOne({ _id: id }, newIncident, (err, Incident) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect("/tickets");
  });
}

export function ProcessIncidentsDeletePage(req, res, next) {
  let id = req.params.id;

  incidentsModel.remove({ _id: id }, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect("/tickets");
  });
}
