import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import errorHandler from './middleware/errorHandler';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

if (['development', 'staging', 'production'].includes(process.env.NODE_ENV)) {
    app.use(morgan('dev'));
}

app.use(routes);

app.get('/', (_, response) => {
    response.status(200).json({
        status: 'success',
        message: 'welcome to Emit-IT API v1',
    });
});

app.all('*', (_, response) => {
    response.status(404).json({
        status: 'error',
        error: 'resource not found',
    });
});

app.use(errorHandler);

export default app;
