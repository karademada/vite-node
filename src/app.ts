import Express from 'express';
import { PORT } from './config';
import Database from './services/Database';
import App from './services/ExpressApp';

const StartServer = async () => {
  
  const app = Express();
  await Database()
  await App(app);

  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
}

StartServer()