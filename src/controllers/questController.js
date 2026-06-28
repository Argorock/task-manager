const Quest = require("../models/questModel");

exports.list = (req, res) => {
  const quests = Quest.getAll();
  res.render("quests/list", { title: "Quest List", quests });
};

exports.detail = (req, res) => {
  const quest = Quest.getById(req.params.id);
  res.render("quests/detail", { title: quest.title, quest });
};

exports.createForm = (req, res) => {
  res.render("quests/create", { title: "Create Quest" });
};

exports.createQuest = (req, res) => {
  Quest.add(req.body);
  res.redirect("/quests");
};

exports.completeQuest = (req, res) => {
  Quest.complete(req.params.id);
  res.redirect("/quests");
};
