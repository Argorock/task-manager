const db = require("../../db");

exports.sheet = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const { rows } = await db.query(
      "SELECT * FROM characters WHERE user_id = $1 LIMIT 1",
      [userId]
    );

    const character = rows.length ? rows[0] : null;

    res.render("characters/sheet", {
      title: "Character Sheet",
      character
    });
  } catch (err) {
    console.error(err);
    res.render("characters/sheet", {
      title: "Character Sheet",
      character: null
    });
  }
};

exports.saveSheet = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { name, className, level, stats } = req.body;

    await db.query(
      `INSERT INTO characters (user_id, name, class, level, stats, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (user_id)
       DO UPDATE SET
         name = EXCLUDED.name,
         class = EXCLUDED.class,
         level = EXCLUDED.level,
         stats = EXCLUDED.stats,
         updated_at = NOW()`,
      [userId, name, className, level, stats]
    );

    res.redirect("/characters/sheet");
  } catch (err) {
    console.error(err);
    res.redirect("/characters/sheet");
  }
};

