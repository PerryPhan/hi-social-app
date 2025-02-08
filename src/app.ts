// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path'; // Import the 'path' module
import createZaloRoutes from './routes/zalo';
import createFacebookRoutes from './routes/facebook';
import createInstagramRoutes from './routes/instagram';
import ZaloService from './services/zalo-service';
import FacebookService from './services/facebook-service';
import InstagramService from './services/instagram-service';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Static Files (Serve the front-end files)
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files from the 'public' directory

// Create service instances
const zaloService = new ZaloService(
  process.env.ZALO_APP_ID || '',
  process.env.ZALO_APP_SECRET || '',
  process.env.ZALO_ACCESS_TOKEN || ''
);
const facebookService = new FacebookService(
  process.env.FACEBOOK_PAGE_ID || '',
  process.env.FACEBOOK_ACCESS_TOKEN || ''
);
const instagramService = new InstagramService(
  process.env.INSTAGRAM_USER_ID || '',
  process.env.INSTAGRAM_ACCESS_TOKEN || ''
);

// Add CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with your specific origin in production
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Inject the service into the routes
app.use('/zalo', createZaloRoutes(zaloService));
app.use('/facebook', createFacebookRoutes(facebookService));
app.use('/instagram', createInstagramRoutes(instagramService));

// Optional: Route to serve the index.html directly
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html')); // Serve the index.html file
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});