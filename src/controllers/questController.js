const db = require("../../db");

// Show the quest creation page
exports.createForm = async (req, res) => {
  try {
    const [quests] = await db.query("SELECT * FROM task ORDER BY created_at DESC");

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

// Create a new quest (insert into task)
exports.createQuest = async (req, res) => {
  const { title, description, xp } = req.body;

  await db.query(
    "INSERT INTO task (name, description, xp_reward, completed, created_at) VALUES (?, ?, ?, 0, NOW())",
    [title, description, xp]
  );

  res.redirect("/quests");
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
