const quests = require("../data/quests.json");
const character = require("../data/characters.json");

module.exports = {
  getAll() {
    return quests;
  },

  getById(id) {
    return quests.find(q => q.id === Number(id));
  },

  add(data) {
    const newQuest = {
      id: quests.length + 1,
      title: data.title,
      description: data.description,
      difficulty: data.difficulty,
      xp: Number(data.xp),
      skill: data.skill, // make sure your form includes this
      status: "incomplete"
    };
    quests.push(newQuest);
  },

  complete(id) {
    const quest = quests.find(q => q.id === Number(id));
    quest.status = "complete";

    // Add XP
    character.xp += quest.xp;

    // Add skill XP
    character.skills[quest.skill] += 1;

    // Auto level-up every 5 skill points
    if (character.skills[quest.skill] % 5 === 0) {
      character.level += 1;
    }
  }
};
