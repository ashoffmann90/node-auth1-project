exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const users = [
    {
      username: "drew",
      password: "word",
      role: 2,
    },
    {
      username: "admin",
      password: "pass",
      role: 1,
    }
  ];

  return knex("users").insert(users);
};
