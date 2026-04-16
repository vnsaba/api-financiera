
import express from 'express';
import cors from 'cors'
import "reflect-metadata"
import cryptoRoutes from './routes/crypto.route';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', cryptoRoutes);
app.use('/api', authRoutes);

export default app;