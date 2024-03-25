import express from 'express';
import router from './routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('api', router);

app.listen(() => {
    console.log(`Server is listening on http:localhost:${PORT}/api`);
})