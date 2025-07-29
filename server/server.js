const db=require("./db/query")
require("dotenv").config();
const express = require("express");
const app = express();
const CarsRouter = require("./routes/CarsRouter");
const FilterRouter = require("./routes/FilterRouter");
const CartRouter = require("./routes/CartRouter");
const AuthRouter = require("./routes/AuthRouter");
const ReviewRouter=require("./routes/ReviewRouter")
const CustomizeRouter=require("./routes/CustomizeRouter")
const CheckoutRouter=require("./routes/CheckoutRouter")
const AdminRouter=require("./routes/AdminRouter")
const session = require("express-session");
const passport = require("passport");

const cors = require("cors");

const { initialize } = require("./passport-config");
initialize(passport);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", AuthRouter);
app.use("/cars", CarsRouter);
app.use("/filters", FilterRouter);
app.use("/cart", CartRouter);
app.use("/reviews",ReviewRouter)
app.use("/customizations",CustomizeRouter)
app.use("/check-out",CheckoutRouter)
app.use("/",AdminRouter)


const PORT = process.env.PORT || 5000; // use Render’s port first, fallback to 5000
app.listen(PORT, () => {
  console.log(`Your server is running on PORT ${PORT}`);
});
