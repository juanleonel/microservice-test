const db = require('mongoose');

let mongoUrl;
const DELAY = 8000;

async function connect({ mongo: { url } }) {
  mongoUrl = url;

  try {
    await db.connect(mongoUrl);
  } catch (err) {
    setTimeout(connect, DELAY);
  }
}

const dbConnection = db.connection;

function disconnect() {
  dbConnection.removeAllListeners();

  return db.disconnect();
}

module.exports = {
  connect,
  disconnect,
};