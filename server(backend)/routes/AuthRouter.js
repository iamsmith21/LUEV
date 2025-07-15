const express = require("express");
const AuthRouter=express.Router()
const AuthController=require("../controller/AuthController")

AuthRouter.post("/register",AuthController.register);
AuthRouter.post("/login", AuthController.login);
AuthRouter.get("/me", AuthController.me);
AuthRouter.post("/logout",AuthController.logout);


module.exports=AuthRouter