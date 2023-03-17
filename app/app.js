/*

File name: app.js

Purpose: 
  This file will generate the HoneyBee webapp

*/

// Import third party modules

import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import passportLocal from "passport-local";

// Set dirname variable
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Import Routes
// Populate once we have created the routes
import router from "./routes/site.routes.server.js";

// Build the app server
const app = express();

// connect to MongoDB
// Populate once we have established Mongo

// Authentication
// Populate once we have an authentication strategy

// Set view engine to EJS
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

// Link routes to the webapp
// Populate once we have routes
app.use("/", router);

export default app;
