import { connect } from 'mongoose';
import DBConfig from '@config/DatabaseConfig';

const InitDatabase = async (): Promise<void> => connect(DBConfig.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Database connected sucessfully');
  }).catch((error) => {
    console.log(`Could not connect to database with error: ${error}`);
  });

export default InitDatabase;
