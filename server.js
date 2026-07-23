const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Sessions MUST come before routes
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false
  })
);

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "src/views"));
app.use(expressLayouts);
app.set("layout", "layouts/main");

// HOME ROUTE
app.get("/", (req, res) => {
  res.redirect("/characters/sheet");
});

// ROUTES
app.use("/", require("./src/routes/auth"));
app.use("/characters", require("./src/routes/characters"));
app.use("/quests", require("./src/routes/quests"));

app.listen(3000, () => {
  console.log("D&D Task Manager running on http://localhost:3000");
});
