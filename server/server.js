const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, './uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
// const storage = multer.memoryStorage(); // saves file into req.file.buffer
const upload = multer({ storage });

const itemsController = require('./controllers/itemsController');
const outfitsController = require('./controllers/outfitsController');
const historyController = require('./controllers/historyController');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/api/items', itemsController.getItems, (req, res) => {
  res.status(200).json(res.locals.items);
});

app.post('/api/items', upload.single('image'), itemsController.addItem, (req, res) => {
  if (req.file) {
    console.log('in post req for /api/items', req.file)
    return res.json({imageUrl: `api/uploads/${req.file.originalname}`});
  }
  res.status(409).json('no files')
});

app.get('/api/uploads/', itemsController.getUploads, (req, res) => {
  // console.log('in get handling for /api/upload', req.params.file)
  // res.sendFile(path.resolve(__dirname, './uploads/', req.params.file))
  res.sendFile(path.resolve(__dirname, './uploads', res.locals.uploads))
})

// app.delete('/api/item/:id', usersController.deleteItem, (req, res) => {
//   res.status(200).json(res.locals);
// });


// Join tables to return all items information to display on frontend
//
// app.get('/api/history', historyController.getHistory, (req, res) => {
//   res.status(200).json(res.locals.history);
// });
//
// app.post('/api/history', historyController.saveOutfit, itemsController.updateItems, (req, res) => {
//   res.status(200).send('Saved outfit and update items date!';
// });

app.get('/api/outfits', itemsController.availableItems, outfitsController.setOutfits, (req, res) => {
  res.status(200).json(res.locals.outfits);
});

/**
 * handle requests for static files
 */
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
