const { pool } = require('../config')


const historyController = {};


historyController.getHistory = (req, res, next) => {
  pool.query('SELECT * FROM history', (err, results) => {
    if (err) {
      throw err
    }
    res.status(200).json(results)
  })
}

historyController.saveHistory = (req, res, next) => {

  const { bottomId, topId, shoesId } = req.body;

  pool.query(`INSERT INTO table(bottom_id, top_id, shoes_id, date) VALUES(${bottomId}, ${topId}, ${shoesId}, GETDATE())`, (err, results) => {
    if (err) {
      throw err
    }
    next();
  })
}


module.exports = historyController;
