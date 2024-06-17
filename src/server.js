
import express  from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
// import { getAllContacts, getContactById } from './services/contacts.js';
import { contactsRouter } from './routers/contacts.js';
import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { eerrorHandler } from './middlewares/errorHandler.js';
dotenv.config();
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(contactsRouter);
  app.use(notFoundHandler);
  app.use(eerrorHandler);


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};