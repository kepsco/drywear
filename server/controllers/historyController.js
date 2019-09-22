const { pool } = require('../config')


const historyController = {};

historyController.getHistory = (req, res, next) => {
  pool.query(
    `SELECT t1.date, t2.image as top, t3.image as bottom, t4.image as shoes
    FROM outfits as t1
    INNER JOIN items as t2
       ON t2.id = t1.top_id
    INNER JOIN items as t3
       ON t3.id = t1.bottom_id
    INNER JOIN items as t4
    ON t4.id = t1.shoes_id`, (err, results) => {
    if (err) {
      throw err
    }
    res.locals.history = results.rows;
    next();
  })
}


module.exports = historyController;
