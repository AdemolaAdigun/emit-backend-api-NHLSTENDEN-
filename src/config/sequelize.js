const { config } = require('dotenv');
require('dotenv')
  .config();

/**
 * Remove dialect options from development when running locally
 */

module.exports = {
  localhost: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
