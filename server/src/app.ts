import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import contactRoutes from './routes/contactRoute';
import config from './configs/config';

const app = express();

app.set('trust proxy', 1)
app.use(cors({
  origin: config.FRONTEND_URL || 'https://stanleyowarieta.com',
  credentials: true
}));
app.use(helmet());
app.use(express.json({ limit: '100kb' }));

app.use('/api/v1', contactRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Stanley Owarieta Portfolio Backend Live 🚀' });
});

export default app;