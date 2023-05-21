/*

File name: utils.js

Purpose: 
  
  Shared functions and utilities that are leveraged across the application



*/

export function userName(req) {
  if (req.user) {
    console.log(req.user._id);
    return req.user._id;
  }
  return "";
}

export function administrator(req) {
  if (req.user) {
    req.user.userType = req.user.role
    console.log("userType:",req.user.userType);

    return req.user.userType;
  }
  return "";
}
export function RoleGuard(roles) {
  return function (req, res, next) {
    if (!req.user) {
      console.log('No user found in the request object');
      return res.redirect("/login");
    }

    console.log('User role:', req.user.role); // Log the user role
    console.log('Allowed roles:', roles); // Log the allowed roles

    const userRole = req.user.role.toLowerCase();
    const allowedRoles = roles.map(role => role.toLowerCase());

    if (!allowedRoles.includes(userRole)) {
      console.log("User role not included in the allowed roles");
      req.flash("error", "You do not have permission to access this page.");
      return res.redirect("/tickets"); // Redirect to the main tickets page
    }

    next();
  };
}
