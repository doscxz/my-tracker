const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const setupMocker = require('./mocks');

function start() {
  const port = 3000;
  const env = process.env.NODE_ENV;
  const dev = env !== 'production';
  const app = next({
    dir: '.',
    dev,
  });

  const handle = app.getRequestHandler();
  let server;
  app
    .prepare()
    .then(() => {
      server = express();

      server.use(bodyParser.json());
      console.log(`Run server: ${dev}`);

      if (dev) {
        setupMocker(server);
      }
      server.use((req, res) => {
        handle(req, res);
      });

      server.listen(port, (err) => {
        if (err) {
          throw err;
        }
        console.log(`> Ready on port ${port} [${env}]`);
      });
    })
    .catch((err) => {
      console.log('An error occurred, unable to start the server');
      console.log(err);
    });
}

start();
