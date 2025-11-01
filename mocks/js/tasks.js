const tasks = require('../json/tasks.json');
const delay = require('../delay');

let AllTask = tasks;

const testJS = {
  setup: (app) => {
    app.get('/api/v1/tasks', async (request, response) => {
      await delay();
      return response.json(AllTask);
    });
    app.post('/api/v1/tasks', async (request, response) => {
      await delay();
      const body = request.body || {};

      const current = Array.isArray(AllTask.data) ? AllTask.data : [];
      const nextId = current.length ? Math.max(...current.map((t) => t.id || 0)) + 1 : 1;

      const newTask = { id: nextId, ...body };
      AllTask.data.push(newTask);

      return response.status(201).json({ data: newTask });
    });
  },
};

module.exports = testJS;
