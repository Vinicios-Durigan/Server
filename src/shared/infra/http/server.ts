
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import  'express-async-error'
import routes from './routes';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm/'

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory)) 
app.use(routes);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        })
    }

    console.log(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
});

app.listen(3333, () => {
    console.log('✔ Server Started on port 3333!');
});