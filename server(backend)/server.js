const db = require("./db/query");

require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");

const cors = require("cors");
const bcrypt = require("bcryptjs");

const {initialize}=require("./passport-config")
initialize(passport)

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
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
  })
);
app.use(passport.initialize())
app.use(passport.session());


app.get("/", (req, res) => {
  res.send("server running");
});

app.get("/cars",async(req,res)=>{
  try {
    const {price,mileage, accident_history}=req.query
    const data=await db.getVehicles({price,mileage, accident_history})
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({message:"Failed to fetch data"})
  }
})

app.get("/filters",async(req,res)=>{
  try {
    const filteredData = await db.getDistinct()
    
    res.status(200).json(filteredData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to fetch filters" });
  }
})

app.post("/register", async (req, res) => {
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
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
});

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong from backend!' });
});


app.listen(process.env.PORT, () => {
  console.log(`Your server is running on PORT ${process.env.PORT}`);
});
