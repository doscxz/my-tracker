const mocksJS = [require('./js/test')];

const setupMocker = (app) => mocksJS.forEach((mock) => mock.setup(app));

module.exports = setupMocker;
