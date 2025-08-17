const test = require('../json/test.json');
const delay = require('../delay');

const testJS = {
  setup: (app) => {
    app.get('/api/v1/test', (request, response) => {
      return response.json(test);
    });
  },
};

module.exports = testJS;
