const express = require("express");
const AdminController = require("../controller/AdminController")
const AdminRouter = express.Router();

AdminRouter.get("/sales",AdminController.sales)
AdminRouter.get("/usage",AdminController.usage)

module.exports = AdminRouter;
