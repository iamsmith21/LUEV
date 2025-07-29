const express = require("express");
const ReviewRouter = express.Router();
const ReviewController=require("../controller/ReviewController")


ReviewRouter.post("/:vehicleId",ReviewController.reviewPost);
ReviewRouter.get("/:vehicleId",ReviewController.reviewGet);

module.exports = ReviewRouter;
