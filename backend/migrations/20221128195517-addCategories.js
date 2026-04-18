const CyrillicToTranslit = require('cyrillic-to-translit-js');

module.exports = {
  async up(db, client) {
    const cyrillicToTranslit = new CyrillicToTranslit();
    let categories = [
      {
        name: 'Керамогранит',
      },
      {
        name: 'Мозаика',
      },
      {
        name: 'Натуральный камень',
      },
      {
        name: 'Аксессуары',
      },
    ];
    categories = categories.map(item => {
      item.url = cyrillicToTranslit.transform(item.name, "_").toLowerCase();
      return item;
    });

    const categoriesResult = await db.collection('categories').insertMany(categories);

    let types = [
      {
        name: 'керамогранит 60x120',
        category: categoriesResult.insertedIds['0']
      },
      {
        name: 'керамогранит 60x60',
        category: categoriesResult.insertedIds['0']
      },
      {
        name: 'керамогранит 40x40',
        category: categoriesResult.insertedIds['0']
      },
    ];

    types = types.map(item => {
      item.url = cyrillicToTranslit.transform(item.name, "_").toLowerCase();
      return item;
    });

    await db.collection('types').insertMany(types);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
