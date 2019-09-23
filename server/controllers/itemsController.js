const { pool } = require('../config')


const itemsController = {};


itemsController.getItems = (req, res, next) => {

  pool.query('SELECT * FROM items', (err, results) => {
    if (err) {
      res.send(err)
      throw err
    }
    res.status(200).json(results.rows)
  })
}

itemsController.availableItems = (req, res, next) => {

  const filter = '';

  if (req.body.weather) {
    const filter = ` AND weather = ${req.body.weather} `;
  }

  pool.query(`SELECT * FROM items WHERE type='shoes'`)
    .then(results => {
      res.locals.items = {};
      res.locals.items.shoes = results.rows;
      return pool.query(`SELECT * FROM items WHERE type = 'top'${filter}AND date < NOW() - INTERVAL '7 days'`)
    })
    .then(results => {
      res.locals.items.tops = results.rows;
      return pool.query(`SELECT * FROM items WHERE type = 'bottom'${filter}AND date < NOW() - INTERVAL '7 days'`)
    })
    .then(results => {
      res.locals.items.bottoms = results.rows;
      next();
    })
    .catch(e => console.error(e))
}

itemsController.updateItemsDate = (req, res, next) => {

  const { top, bottom, shoes } = req.body;

    pool.query(`UPDATE items SET date=NOW() WHERE id IN ( ${top}, ${bottom}, ${shoes} )`)
    .then(results => {
      next();
    })
    .catch(e => console.error(e))
}

itemsController.updateItemDates  = (req, res, next) => {

  const { topId, bottomId, shoesId } = req.body;

  // TODO: Change date to 8 days ago, dynamically
  pool.query(`UPDATE items SET date='2019-09-05' WHERE id IN (${topId}, ${bottomId}, ${shoesId})`, (err, results) => {
    if (err) {
      console.log(err - ' outfitsController.removeOutfit');
    }
    console.log('Outfit successfully removed!');
    next();
  })
}



module.exports = itemsController;
