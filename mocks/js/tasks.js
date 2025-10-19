const tasks = require('../json/tasks.json');
const delay = require('../delay');

const testJS = {
  setup: (app) => {
    app.get('/api/v1/tasks', async (request, response) => {
      await delay();
      return response.json(tasks);
    });
  },
};

module.exports = testJS;
