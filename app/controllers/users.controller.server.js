/*

File name: users.controller.server.js

Purpose: 
  Controllers for users - creation, deletion, editting, etc

*/
import express from "express";
import passport from "passport";
import User from "../models/users.js";
import router from "../routes/site.routes.server.js";
import { userName } from "../utils/utils.js";

export function loginPage(req, res, next) {
  if (!req.user) {
    res.render("index", {
      title: "Login",
      page: "login",
      messages: req.flash("error"),
      displayName: userName(req),
    });
  }
  return res.redirect("/tickets");
}
export function registerPage(req, res, next) {
  if (!req.user) {
    res.render("index", {
      title: "Register",
      page: "register",
      messages: req.flash("register error"),
      displayName: userName(req),
    });
  }
}
// Process

export function ProcessLogin(req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.error(err);
      res.end(err);
    }

    if (!user) {
      req.flash("login", "Authentication Error");
      return res.redirect("/login");
    }

    req.logIn(user, function (err) {
      if (err) {
        console.error(err);
        res.end(err);
      }

      return res.redirect("/tickets");
    });
  })(req, res, next);
}
export function ProcessRegister(req, res, next) {
  let newUser = new User({
    username: req.body.username,
    emailAddress: req.body.emailAddress,
    displayName: req.body.firstName + " " + req.body.lastName,
  });

  User.register(newUser, req.body.password, function (err) {
    if (err) {
      if (err.name == "UserExistsError") {
        console.error("User Already Exists!");
        req.flash("registerMessage", "register error");
      } else {
        console.error(err.name);
        req.flash("registerMessage", "Server Error");
      }

      return res.redirect("/register");
    }

    console.log("account created");
    return res.redirect("/");

    // return passport.authenticate("local")(req, res, function () {
    //   console.log("account created")
    //   return res.redirect("/home");
    // });
  });
}

export function ProcessLogout(req, res, next) {
  req.logOut(function (err) {
    if (err) {
      console.error(err);
      res.end(err);
    }

    console.log("logged out successfully");
  });

  res.redirect("/login");
}
