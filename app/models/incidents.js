/*

File name: incidents.js

Purpose: 
  Mongoose model for incidents



*/

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const IncidentSchema = new Schema({
    recordNumber: String,
    description: String,
    priority:  String,
    narrative: String,
    customerInformation: String,
    status: String,
    resolutionInformation: String
},
{
    timestamps: true,
    collection: 'incidents'
});

export default mongoose.model('Incident', IncidentSchema);
