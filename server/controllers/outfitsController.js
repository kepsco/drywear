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

     // 1. Create new object
     // 2. Set shoe key and add a shoe value
     // 3. Set top key and add a top value
     // 4. Set bottom key and add a bottom value






    next();
}



// 3 shoes
// 5 tops
// 5 bottoms

// outfits = [
//   {
//     top: {id: 1, type: 'top', color: 'dark', image: url, weather: 'cold' },
//     bottom: {id: 2, type: 'bottom', color: 'dark', image: url, weather: 'cold' },
//     shoes: {id: 3, type: 'shoes', color: 'dark', image: url, weather: 'cold' },
//   },
//   {
//     top: {id: 5, type: 'top', color: 'dark', image: url, weather: 'cold' },
//     bottom: {id: 7, type: 'bottom', color: 'dark', image: url, weather: 'cold' },
//     shoes: {id: 3, type: 'shoes', color: 'dark', image: url, weather: 'cold' },
//   },
//   {
//     top: {id: 1, type: 'top', color: 'dark', image: url, weather: 'cold' },
//     bottom: {id: 2, type: 'bottom', color: 'dark', image: url, weather: 'cold' },
//     shoes: {id: 3, type: 'shoes', color: 'dark', image: url, weather: 'cold' },
//   },
//   {
//     top: {id: 1, type: 'top', color: 'dark', image: url, weather: 'cold' },
//     bottom: {id: 2, type: 'bottom', color: 'dark', image: url, weather: 'cold' },
//     shoes: {id: 3, type: 'shoes', color: 'dark', image: url, weather: 'cold' },
//   },
//   {
//     top: {id: 1, type: 'top', color: 'dark', image: url, weather: 'cold' },
//     bottom: {id: 2, type: 'bottom', color: 'dark', image: url, weather: 'cold' },
//     shoes: {id: 3, type: 'shoes', color: 'dark', image: url, weather: 'cold' },
//   },
// ]


module.exports = outfitsController;
