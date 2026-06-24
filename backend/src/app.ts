import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './exceptions/error-handler';
import { authRoutes } from './routes/auth.routes';
import { productRoutes } from './routes/product.routes';
import { documentRoutes } from './routes/document.routes';
import { chatRoutes } from './routes/chat.routes';
import { dashboardRoutes } from './routes/dashboard.routes';
import businessRoutes from './routes/business.routes';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/business', businessRoutes);

// Global error handler
app.use(errorHandler);

export default app;
