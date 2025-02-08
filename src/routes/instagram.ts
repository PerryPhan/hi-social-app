// src/routes/instagram.ts
import express, { Router, Request, Response } from 'express';
import InstagramService from '../services/instagram-service';

const createInstagramRoutes = (instagramService: InstagramService): Router => {
  const router = express.Router();

  router.post('/send-message', async (req: Request, res: Response) => {
    try {
      const { recipient, message } = req.body;

      const responseData = await instagramService.sendMessage(recipient, message);
      res.json(responseData);
    } catch (error: any) {
      console.error('Error sending Instagram message:', error);
      res.status(500).json({ error: 'Failed to send Instagram message', details: error.message });
    }
  });

  return router;
};

export default createInstagramRoutes;