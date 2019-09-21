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

  pool.query("SELECT * FROM items WHERE type='shoes' AND date < NOW() - INTERVAL '7 days'")
    .then(results => {
      res.locals.items = {};
      res.locals.items.shoes = results.rows;
      return pool.query("SELECT * FROM items WHERE type='top' AND date < NOW() - INTERVAL '7 days'")
    })
    .then(results => {
      res.locals.items.tops = results.rows;
      return pool.query("SELECT * FROM items WHERE type='bottom' AND date < NOW() - INTERVAL '7 days'")
    })
    .then(results => {
      res.locals.items.bottoms = results.rows;
      next();
    })
    .catch(e => console.error(e))
}

itemsController.updateItems = (req, res, next) => {

  const { bottomId, topId, shoesId } = req.body;


    pool.query("UPDATE items SET date=NOW() WHERE id IN ( bottomId, topId, shoesId )")
      .then(results => {
        console.log(results)
        next();
      })
      .catch(e => console.error(e))
}


module.exports = itemsController;
