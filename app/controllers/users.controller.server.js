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
      userType: req.user ? req.user.userType : undefined,
    });
  } else {
    res.redirect("/tickets");
  }
}

export function registerPage(req, res, next) {
  if (!req.user) {
    res.render("index", {
      title: "Register",
      page: "register",
      messages: req.flash("register error"),
      displayName: userName(req),
      userType: req.user ? req.user.userType : undefined,
    });
  } else {
    res.redirect("/tickets");
  }
}


export function accountManagementPage(req, res, next) {
  let userType = req.user ? req.user.userType : "programmer";

  let id = req.params.id;

  console.log(id);

  User.findById(id, (err, user) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.render("index", {
      title: "Account Management",
      page: "modifyuser",
      messages: req.flash("error"),
      displayName: userName(req),
      account: user,
      userType: userType
    })

  })


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

      return res.redirect("/tickets/nc");
    });
  })(req, res, next);
}
export function ProcessRegister(req, res, next) {
  const { username, password, role, ...otherFields } = req.body;

  // Set the user type based on the role
  let userType;
  switch (role) {
    case 'programmer':
      userType = 'programmer';
      break;
    case 'ceo':
      userType = 'ceo';
      break;
    case 'incidentsManager':
      userType = 'incidentsManager';
      break;
    case 'supportAgent':
      userType = 'supportAgent';
      break;
    case 'leadDeveloper':
      userType = 'leadDeveloper';
      break;
    default:
      userType = "programmer";
  }
  console.log(userType);
  let newUser = new User({
    username,
    emailAddress: otherFields.emailAddress,
    displayName: otherFields.firstName + " " + otherFields.lastName,
    userType,
    role,
  });

  User.register(newUser, password, function (err) {
    if (err) {
      console.log("Error in registration");
      if (err.name == "UserExistsError") {
        console.error("User Already Exists!");
        req.flash("registerMessage", "register error");
      } else {
        console.log("Other error");
        console.error(err.name);
        req.flash("registerMessage", "Server Error");
      }

      return res.redirect("/register");
    }

    console.log("account created");
    return res.redirect("/");

    return passport.authenticate("local")(req, res, function () {
      console.log("account created");
      return res.redirect("/home");
    });
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


export function ProcessAccountManagement(req, res, next) {
  let userType = req.user ? req.user.userType : "programmer";

  let id = req.params.id;

  console.log(req.body);

  console.log(id);

  let newUser = User({
    _id: id,
    displayName: req.body.displayName,
    userName: req.body.userName,
    emailAddress: req.body.Email
    
  });

  console.log(newUser);

  User.updateOne({ _id: id }, newUser, (err, user) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect("/tickets",{
      userType: userType
    });

  })
}