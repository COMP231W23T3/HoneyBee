/*

File name: server.js

Purpose: 
  This file will serve up the HoneyBee webapp




*/

// Import third party modules

import http from "http";
import app from "./app/app.js";

const server = http.createServer(app);
const PORT = normalizePort(process.env.PORT || 3000);
app.set("port", PORT);

server.listen(PORT);

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
