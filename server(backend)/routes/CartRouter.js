const express = require("express");
const CartController=require("../controller/CartController")
const isAuthenticated=require("../middleware/isAuth")
const CartRouter = express.Router();

CartRouter.get("/",isAuthenticated,CartController.cartGet);
CartRouter.post("/", isAuthenticated,CartController.cartPost);
CartRouter.patch("/:id", isAuthenticated,CartController.cartPatch);
CartRouter.delete("/:id", isAuthenticated,CartController.cartDelete);
module.exports = CartRouter;
