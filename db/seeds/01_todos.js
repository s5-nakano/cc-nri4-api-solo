// seeds/01_todos.js
exports.seed = function (knex) {
  return knex("todos")
    .del()
    .then(()=>{
      return knex.raw('ALTER SEQUENCE todos_id_seq RESTART WITH 1'); // Reset the id sequence
    })
    .then(() => {
      return knex("todos").insert([
        { task: "洗濯をする", status: "Todo" },
        { task: "朝食を食べる", status: "In Progress" },
        { task: "歯磨きをする", status: "Done" },
      ]);
    });
};
