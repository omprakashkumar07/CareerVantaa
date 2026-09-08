import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config.js';
import { paymentsRouter } from './routes/payments.js';
import { webhooksRouter } from './routes/webhooks.js';
import { downloadsRouter } from './routes/downloads.js';

const app = express();

// Security middlewares
app.use(helmet());

// CORS configuration - Allow only frontend origin in production
const allowedOrigins = [
  'https://careervantaa.com',
  'https://www.careervantaa.com',
  'http://localhost:5173' // for local development
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// We must place raw webhooks route BEFORE express.json()
app.use('/api/webhooks', webhooksRouter);

// Standard JSON parsing for other routes
app.use(express.json());

// Routes
app.use('/api/payments', paymentsRouter);
app.use('/api/download', downloadsRouter);

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start the server
app.listen(config.port, '0.0.0.0', () => {
  console.log(`Server is running on port ${config.port}`);
});
