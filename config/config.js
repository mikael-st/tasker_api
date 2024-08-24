const path = require('path');
const dotenv = require('dotenv');

dotenv.config()

module.exports = {
  development: {
    url: process.env.DATABASE_URI,
    dialect: 'postgres',
    logging: true
  },
  test: {
    url: process.env.DATABASE_URI,
    dialect: 'postgres',
    logging: true
  },
  production: {
    url: process.env.DATABASE_URI,
    dialect: 'postgres',
    logging: true
  }
};

module.exports = {
  config: path.resolve('config', 'config.js')
}