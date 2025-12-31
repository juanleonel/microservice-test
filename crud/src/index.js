const path = require('path');
const db = require('./db/db');
const app = require('./app');
const { createConfig } = require('./configs/config');

class BackGroundApp {
  _server;

  constructor() {}

  unexpectedError (error) {
    console.error('unhandled error', { error });
    this.closeServer();
  }

  closeServer() {
    if (this._server) {
      this._server.close(() => {
        console.log('server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  }

  async execute() {
    const configPath = path.join(__dirname, '../.env');
    const appConfig = createConfig(configPath);
    await db.connect(appConfig);

    this._server = app.listen(appConfig.port, () => {
      console.log('account service started', { port: appConfig.port });
    });
  }
}

const backGroundApp = new BackGroundApp();
process.on('uncaughtException', backGroundApp.unexpectedError);
process.on('unhandledRejection', backGroundApp.unexpectedError);
backGroundApp.execute();
