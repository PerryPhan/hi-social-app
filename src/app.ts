// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
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

// Inject the service into the routes
app.use('/zalo', createZaloRoutes(zaloService));
app.use('/facebook', createFacebookRoutes(facebookService));
app.use('/instagram', createInstagramRoutes(instagramService));

app.get('/', (req, res) => {
  res.send('Multi-Channel Messaging Server is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});