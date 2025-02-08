// src/routes/zalo.ts
import express, { Router, Request, Response } from 'express';
import ZaloService from '../services/zalo-service';

const createZaloRoutes = (zaloService: ZaloService): Router => {
  const router = express.Router();

  router.post('/send-message', async (req: Request, res: Response) => {
    try {
      const { recipient, message } = req.body;

      const responseData = await zaloService.sendMessage(recipient, message);
      res.json(responseData);
    } catch (error: any) {
      console.error('Error sending Zalo message:', error);
      res.status(500).json({ error: 'Failed to send Zalo message', details: error.message });
    }
  });

  return router;
};

export default createZaloRoutes;