import { DATABASE_URI } from "./env.config";

module.exports = {
  development: {
    uri: DATABASE_URI,
    dialect: 'postgres',
    logging: true
  },
  test: {
    uri: DATABASE_URI,
    dialect: 'postgres',
    logging: true
  },
  production: {
    uri: DATABASE_URI,
    dialect: 'postgres',
    logging: true
  }
};