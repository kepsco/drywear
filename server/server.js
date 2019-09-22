const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const PORT = 3000;

const itemsController = require('./controllers/itemsController');
const outfitsController = require('./controllers/outfitsController');
const historyController = require('./controllers/historyController');

app.use(bodyParser.json());


app.get('/api/items', itemsController.getItems, (req, res) => {
  res.status(200).json(res.locals.items);
});

// app.post('/api/item', itemsController.addItem, (req, res) => {
//   res.status(200).json(res.locals);
// });

// app.delete('/api/item/:id', usersController.deleteItem, (req, res) => {
//   res.status(200).json(res.locals);
// });


// Join tables to return all items information to display on frontend
app.get('/api/history', historyController.getHistory, (req, res) => {
  res.status(200).json(res.locals.history);
});

app.get('/api/outfits', itemsController.availableItems, outfitsController.setOutfits, (req, res) => {
  res.status(200).json(res.locals.outfits);
});

app.post('/api/outfits', outfitsController.saveOutfit, itemsController.updateItemsDate, (req, res) => {
  res.status(200).send('Saved outfit and update items date!');
});



// handle requests for static files
// app.use('/assets', express.static(path.join(__dirname, '/../client/assets')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res, next) => {
  res.status(404).send("Sorry can't find that!");
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

// launch our backend into a port
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
