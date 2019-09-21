const path = require('path');
const bodyParser = require('body-parser');
// const api = require('./api.js');

const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

// global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: 'An error occurred',
  };
  console.log('this is err', err)
  const errObj = Object.assign(defaultError, err);
  console.error(errObj.log);
  res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
