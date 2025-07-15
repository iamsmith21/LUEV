const express = require("express");
const FilterController=require("../controller/FilterController")
const FilterRouter = express.Router();

FilterRouter.get("/",FilterController.filterGet);

module.exports = FilterRouter;
