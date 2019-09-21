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


module.exports = historyController;
