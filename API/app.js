import express from 'express';
import dotenv from 'dotenv';
import publicRoutes from './routes/public.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/API',publicRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});