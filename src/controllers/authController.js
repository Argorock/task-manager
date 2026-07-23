const db = require("../../db");
const bcrypt = require("bcrypt");


exports.showRegister = (req, res) => {
  res.render("auth/register", { title: "Register" });
};


exports.register = async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (email, password) VALUES ($1, $2)",
    [email, hashed]
  );

  res.redirect("/login");
};

exports.showLogin = (req, res) => {
  res.render("auth/login", { title: "Login" });
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  const { rows } = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (rows.length === 0) return res.redirect("/login");

  const user = rows[0];

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.redirect("/login");

  req.session.user = { id: user.id, email: user.email };

  res.redirect("/characters/sheet");
};


exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
