// src/routes/facebook.ts
import express, { Router, Request, Response } from 'express';
import FacebookService from '../services/facebook-service';

const createFacebookRoutes = (facebookService: FacebookService): Router => {
  const router = express.Router();

  router.post('/send-message', async (req: Request, res: Response) => {
    try {
      const { recipient, message } = req.body;

      const responseData = await facebookService.sendMessage(recipient, message);
      res.json(responseData);
    } catch (error: any) {
      console.error('Error sending Facebook message:', error);
      res.status(500).json({ error: 'Failed to send Facebook message', details: error.message });
    }
  });

  return router;
};

export default createFacebookRoutes;