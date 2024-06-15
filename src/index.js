import { initMongoconnection} from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootStrap = async () => {
  await initMongoconnection();
  setupServer();
};

bootStrap();



