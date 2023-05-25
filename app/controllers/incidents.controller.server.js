/*

File name: incidents.controller.server.js

Purpose: 
  Controllers for incidents - creation, deletion, editting, etc



*/
import PDFDocument from 'pdfkit';
import User from "../models/users.js"
import incidentsModel from "../models/incidents.js";
import { administrator, userName } from "../utils/utils.js";

export async function AddTicketsPage(req, res, next) {
  const users = await User.find({
    where: {
      role:"programmer"
    }
  });

  const programmers = users.filter(user=>user.role=='programmer')
  console.log(users)
  res.render("index", {
    title: "Add Ticket",
    page: "addticket",
    incidents: {},
    displayName: userName(req),
    userType: administrator(req),
    users: programmers
  });
}

export function ProcessTicketsAddPage(req, res, next) {

  let today = new Date().toLocaleDateString(undefined, {
    day:   '2-digit',
    month: '2-digit',
    year:  'numeric',
});

let narrativeUpdate = 
`

INCIDENT CREATED ON: ${today}
New Description: ${req.body.description}
New Priority: ${req.body.priority}
New Customer Information: ${req.body.responsibility}
New Status: ${req.body.status}
`

  let newIncident = incidentsModel({
    recordNumber: req.body.recordNumber,
    description: req.body.description,
    priority: req.body.priority,
    narrative: narrativeUpdate,
    responsibility: req.body.responsibility,
    status: "NEW"
  });
  incidentsModel.create(newIncident, (err, Incident) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.redirect("/tickets");
  });
}

export async function DisplayIncidentsEditPage(req, res, next) {
  let id = req.params.id;
  const users = await User.find({
    where: {
      role:"programmer"
    }
  });

  const programmers = users.filter(user=>user.role=='programmer')
  console.log(id);

  incidentsModel.findById(id, (err, Incident) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    console.log(Incident);

    res.render("index", {
      title: "Edit Incident",
      page: "addticket",
      incidents: Incident,
      displayName: userName(req),
      userType: administrator(req),
      users: programmers

    });
  });
}
export function ProcessIncidentsEditPage(req, res, next) {
  let id = req.params.id;

  let today = new Date().toLocaleDateString(undefined, {
    day:   '2-digit',
    month: '2-digit',
    year:  'numeric',
  });

  let narrativeUpdate = `
  UPDATE ON: ${today}
  ID: ${id}
  New Description: ${req.body.description}
  New Priority: ${req.body.priority}
  New Customer Information: ${req.body.responsibility}
  New Status: ${req.body.status}
  New Resolution: ${req.body.resolutionInformation}

  `;

  console.log(req.body.status);

  let updatedIncident = incidentsModel({
    _id: id,
    recordNumber: req.body.recordNumber,
    description: req.body.description,
    priority: req.body.priority,
    narrative: req.body.narrative + narrativeUpdate,
    responsibility: req.body.responsibility,
    status: req.body.status,
    resolutionInformation: req.body.resolutionInformation // set resolutionInformation here
  });

  // Handle when incident status is "CLOSED"
  if (req.body.status == "CLOSED" && !req.body.resolutionInformation) {
    // This is poor UX, with more time, we can make this trigger an alert message to remind the user to enter in their details
    // Maybe you want to return a response here instead of just logging a console message?
    console.error('Resolution information must be provided for closing an incident.');
  }

  // Update the incident
  incidentsModel.updateOne({ _id: id }, updatedIncident, (err, Incident) => {
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

export async function SearchIncidents(req, res) {
  const { term } = req.query;

  // use regex for a flexible search
  const searchTerm = new RegExp(term, 'i');

  // Find incidents that match the search term in the recordNumber or description fields
  const incidents = await incidentsModel.find({
    $or: [{ recordNumber: searchTerm }, { description: searchTerm },{responsibility:searchTerm}],
  });

  res.render("index", {
    title: "Search Results",
    page: "searchresults", 
    incidents: incidents,
    displayName: userName(req),
    userType: administrator(req),
  });
}


export async function GenerateIncidentReport(req, res, next) {
    let id = req.params.id;

    // Find the incident
    const incident = await incidentsModel.findById(id);
    if (!incident) {
        return res.status(404).send('Incident not found');
    }

    // Create a PDF document
    const doc = new PDFDocument;

    // Write some content to the document
    doc.fontSize(18).text('Incident Report', { align: 'center' }).fontSize(14).moveDown();
    doc.text(`Record Number: ${incident.recordNumber}`);
    doc.text(`Responsibility: ${incident.responsibility}`);
    doc.text(`Description: ${incident.description}`);
    doc.text(`Priority: ${incident.priority}`);
    doc.text(`Status: ${incident.status}`);
    doc.text(`Resolution Information: ${incident.resolutionInformation}`);
    // Add more details as required

    // Set up the response to return a PDF
    res.setHeader('Content-disposition', 'attachment; filename=report.pdf');
    res.setHeader('Content-type', 'application/pdf');

    // Pipe the document to the response
    doc.pipe(res);

    // Finalize the document
    doc.end();
}

export async function GetIncidentStatusCounts(req, res, next) {
  const closedCount = await incidentsModel.countDocuments({ status: "CLOSED" });
  const notClosedCount = await incidentsModel.countDocuments({ status: { $ne: "CLOSED" } });

  res.json({ closedCount, notClosedCount });
}
