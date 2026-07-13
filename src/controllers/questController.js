const db = require("../../db");

// Show the quest creation page
exports.createForm = async (req, res) => {
  try {
    const [quests] = await db.query(`
      SELECT 
        idtask AS id,
        name AS title,
        description,
        xp_reward AS xp,
        completed,
        created_at,
        NULL AS size
      FROM task
      ORDER BY created_at DESC
    `);


    res.render("quests/create", {
      title: "Your Quests",
      quests
    });
  } catch (err) {
    console.error(err);
    res.render("quests/create", {
      title: "Your Quests",
      quests: []
    });
  }
};

// Create a new quest
exports.createQuest = async (req, res) => {
  try {
    const { title, description, xp, size } = req.body;

    const name = title;
    const xp_reward = xp;
    const completed = 0;
    const created_at = new Date();

    await db.query(
      "INSERT INTO task (name, description, xp_reward, completed, created_at) VALUES (?, ?, ?, ?, ?)",
      [name, description, xp_reward, completed, created_at]
    );

    res.redirect("/quests");
  } catch (err) {
    console.error(err);
    res.redirect("/quests");
  }
};


// Mark quest as complete
exports.completeQuest = async (req, res) => {
  await db.query("UPDATE task SET completed = 1 WHERE idtask = ?", [
    req.params.id
  ]);

  res.redirect("/quests");
};

// Delete a quest
exports.deleteQuest = async (req, res) => {
  await db.query("DELETE FROM task WHERE idtask = ?", [req.params.id]);

  res.redirect("/quests");
};
