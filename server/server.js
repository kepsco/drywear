const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');


const itemsController = require('./controllers/itemsController');
const outfitsController = require('./controllers/outfitsController');
const historyController = require('./controllers/historyController');

app.use(bodyParser.json());


app.get('/api/items', itemsController.getItems, (req, res) => {
  res.status(200).json(res.locals.items);
});

// app.post('/api/item', itemsController.setItem, (req, res) => {
//   res.status(200).json(res.locals);
// });
//
// app.delete('/api/item/:id', usersController.deleteItem, (req, res) => {
//   res.status(200).json(res.locals);
// });

// app.get('/api/history', historyController.getHistory, (req, res) => {
//   res.status(200).json(res.locals.history);
// });

app.get('/api/outfits', itemsController.availableItems, outfitsController.setOutfits, (req, res) => {
  res.status(200).json(res.locals.outfits);
});

//  outfitsController.setOutfits,

/**
 * handle requests for static files
 */
// app.use('/assets', express.static(path.join(__dirname, '/../client/assets')))


// catch-all route handler for any requests to an unknown route
app.use('*', (req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// launch our backend into a port
app.listen(3000, () => console.log(`LISTENING ON PORT 3000`));
