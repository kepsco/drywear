const { pool } = require('../config')

const outfitsController = {};

outfitsController.setOutfits = (req, res, next) => {

    res.locals.outfits = [];

    const { tops, bottoms, shoes } = res.locals.items;

    for (let i = 0; i < 5; i++) {
      const outfit = {};

      let topIndex = Math.floor(Math.random() * tops.length);
      let bottomIndex = Math.floor(Math.random() * bottoms.length);
      let shoesIndex = Math.floor(Math.random() * shoes.length);

      outfit['top'] = tops[topIndex];
      outfit['bottom'] = bottoms[bottomIndex];
      outfit['shoes'] = shoes[shoesIndex];

      res.locals.outfits.push(outfit);
    }
    next();
}


outfitsController.saveOutfit = (req, res, next) => {
  console.log(req.body);
  const { top, bottom, shoes } = req.body;

  pool.query(`INSERT INTO outfits(top_id, bottom_id, shoes_id) VALUES(${top}, ${bottom}, ${shoes})`, (err, results) => {
    if (err) {
      console.log(err - 'Cannot save new outfit');
    }
    next();
  })
}

outfitsController.findTodaysOutfit = (req, res, next) => {

  const today = new Date().toISOString().slice(0,10);

  pool.query(`SELECT * FROM outfits WHERE outfits.date='${today}'`, (err, results) => {
    if (err) {
      console.log(err - ' outfitsController.findTodaysOutfit');
    }
    if (results.rows === undefined) res.locals.today = false;
    else if (results.rows.length >= 1) res.locals.today = true;
    else res.locals.today = false;
    next();
  })
}

outfitsController.removeOutfit  = (req, res, next) => {

  const { id } = req.body;

  pool.query(`DELETE FROM outfits WHERE outfits.id=${id}`, (err, results) => {
    if (err) {
      console.log(err - ' outfitsController.removeOutfit');
    }
    console.log('Outfit successfully removed!');
    next();
  })
}

module.exports = outfitsController;
