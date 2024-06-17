
import express  from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
// import { getAllContacts, getContactById } from './services/contacts.js';
import { contactsRouter } from './routers/contacts.js';
import { env } from './utils/env.js';

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
  // app.use((err, req, res, next) => {
  //   res.status(500).json({
  //     message: 'Something went wrong',
  //     error: err.message,
  //   });
  // });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};