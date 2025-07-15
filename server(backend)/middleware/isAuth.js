function isAuthenticated(req, res, next) {
  console.log("req.isAuthenticated():", req.isAuthenticated());
  console.log("req.user:", req.user);
  console.log("req.session:", req.session);
  if (req.isAuthenticated()) return next();
  return res.status(200).json({ message: "Unauthorized" });
}
module.exports = isAuthenticated;