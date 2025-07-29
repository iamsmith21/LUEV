const db = require("../db/query");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.register=async (req, res) => {
  const { email, password, firstname, lastname, mobile } = req.body;
  try {
    const userExists = await db.getUserByEmail(email);
    if (userExists) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.registerUser(email, hashedPassword, firstname, lastname, mobile);

    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register user" });
  }
}

// exports.login=(req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) return next(err);
//     if (!user) return res.status(401).json({ error: info.message });

//     req.logIn(user, (err) => {
//       if (err) return next(err);
//       return res.status(200).json({ message: "Login successful", user });
//     });
//   })(req, res, next);
// }
exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);

      req.session.save((err) => {
        if (err) return next(err);
        return res.status(200).json({ message: "Login successful", user });
      });
    });
  })(req, res, next);
};

exports.me=(req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(200).json({ user: null });
  }
}

exports.logout= (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
}