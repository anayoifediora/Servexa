const db = require('../config/connection');
const { User, Service } = require('../models');

const userSeeds = require('./userSeeds.json');
const serviceSeeds = require('./serviceSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Service.deleteMany({});

    await User.create(userSeeds);
    await Service.create(serviceSeeds);

    console.log('completed');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
