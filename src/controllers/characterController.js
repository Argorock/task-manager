const path = require("path");

// LOAD CHARACTER SHEET FROM JSON (correct version)
exports.sheet = (req, res) => {
  // Force Node to reload the JSON fresh every time
  delete require.cache[require.resolve("../data/characters.json")];

  const character = require("../data/characters.json");

  res.render("characters/sheet", { character });
};

// OPTIONAL: Level up (you can update JSON here later)
exports.levelUp = (req, res) => {
  res.redirect("/characters/sheet");
};
