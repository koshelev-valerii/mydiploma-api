require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET,
  DB_HOST,
  PORT,
} = process.env;
const DEV_SECRET = 'SECRETSECRETSECRET';
const DEV_DB_HOST = 'mongodb://localhost:27017/my-database';
const DEV_PORT = 3000;

const DB = NODE_ENV === 'production' && DB_HOST ? DB_HOST : DEV_DB_HOST;
const SERVER_PORT = NODE_ENV === 'production' && PORT ? PORT : DEV_PORT;
const SECRET_STRING = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : DEV_SECRET;

console.log({
  DB,
  SERVER_PORT,
  SECRET_STRING,
});

module.exports = {
  DB,
  SERVER_PORT,
  SECRET_STRING,
};
