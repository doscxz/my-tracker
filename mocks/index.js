const mocksJS = [require('./js/tasks')];

const setupMocker = (app) => mocksJS.forEach((mock) => mock.setup(app));

module.exports = setupMocker;
