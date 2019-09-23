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

module.exports = outfitsController;
