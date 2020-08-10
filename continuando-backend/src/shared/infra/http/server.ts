import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
// Route to serve statice files
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // Check if the error was created by our app(user) - known error
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Make it easier to debug error
  console.log(err);

  // If we don't know the error(something we weren't expecting), return a more general error message
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
