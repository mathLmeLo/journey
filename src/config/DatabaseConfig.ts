/* eslint-disable import/no-mutable-exports */

import 'dotenv/config';

interface IDatabaseConfig {
  uri: string;
  username: string;
  password: string;
  database: string;
}

const databaseConfig: IDatabaseConfig = {
  uri: process.env.DB_URI || 'mongodb+srv://admin:pwd123@linkapi-challenge.ca2bm.mongodb.net/journey?retryWrites=true&w=majority',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

} as IDatabaseConfig;

export default databaseConfig as IDatabaseConfig;
