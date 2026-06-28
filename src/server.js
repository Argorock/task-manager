const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(expressLayouts);
app.set("layout", "layouts/main");

// Routes
const indexRoutes = require("./routes/index");
const questRoutes = require("./routes/quests");
const characterRoutes = require("./routes/characters");

app.use("/", indexRoutes);
app.use("/quests", questRoutes);
app.use("/characters", characterRoutes);

app.listen(3000, () => {
  console.log("D&D Task Manager running on port 3000");
});
