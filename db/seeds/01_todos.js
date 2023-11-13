// seeds/01_todos.js
exports.seed = function (knex) {
    return knex('todos')
      .del()
      .then(function () {
        return knex('todos').insert([
          { id: 1, task: '洗濯をする', status: 'Todo' },
          { id: 2, task: '朝食を食べる', status: 'In Progress' },
          { id: 3, task: '歯磨きをする', status: 'Done' },
        ]);
      });
  };