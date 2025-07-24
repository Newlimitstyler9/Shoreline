import express from 'express';
import path from 'path';
import { registerRoutes } from './routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the built client
app.use(express.static(path.join(__dirname, '../dist/public')));

// Register API routes
registerRoutes(app);

// Serve index.html for all non-API routes (SPA routing)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, '../dist/public/index.html'));
  }
});

const port = parseInt(process.env.PORT || '3000', 10);
app.listen(port, '0.0.0.0', () => {
  console.log(`Production server running on port ${port}`);
}); 