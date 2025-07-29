const express = require("express");
const CarsController = require("../controller/CarsController");
const CarsRouter = express.Router();

CarsRouter.get("/", CarsController.CarsGet);
CarsRouter.get("/:id", CarsController.CarGet);

module.exports = CarsRouter;
