/*

File name: users.js

Purpose: 
  Mongoose model for user



*/

import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';
const {PassportLocalSchema} = mongoose;
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    displayName: String,
    username: String,
    emailAddress: String,
    userType: String,
    role: { // Add this new field for role
      type: String,
      enum: ['programmer', 'ceo','incidentsManager','supportAgent','leadDeveloper'], // Add other roles as needed
      default: 'programmer'
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

UserSchema.plugin(passportLocalMongoose);
export default mongoose.model("User", UserSchema);
