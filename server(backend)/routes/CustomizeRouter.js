const express = require("express");
const CustomizeRouter = express.Router();
const customizationController = require("../controller/CustomizeController");


CustomizeRouter.get("/", customizationController.getCustomizationOptions);

module.exports = CustomizeRouter;
