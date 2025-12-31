const express = require('express');
const cors = require('cors');
const v1 = require('./routes/v1');
const consumerModule = require('./modules/kafka.module');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

consumerModule();

app.use(express.json());

app.use('/v1', v1);

module.exports = app;
