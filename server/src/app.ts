import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import contactRoutes from './routes/contactRoute';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '100kb' }));

app.use('/api/v1', contactRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Stanley Owarieta Portfolio Backend Live 🚀' });
});

export default app;