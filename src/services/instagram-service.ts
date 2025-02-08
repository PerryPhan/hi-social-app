// src/services/instagram-service.ts
import fetch from 'node-fetch';
import MessagingServiceInterface from './messaging-service-interface';

class InstagramService implements MessagingServiceInterface {
  private userId: string;
  private accessToken: string;
  private baseUrl: string = `https://graph.facebook.com/v17.0/`; // Instagram uses Facebook Graph API

  constructor(userId: string, accessToken: string) {
    this.userId = userId;
    this.accessToken = accessToken;
  }

    private async instagramApiRequest(endpoint: string, method: string = 'GET', body: any = null): Promise<any> {
        const url = `${this.baseUrl}${endpoint}`;

        const headers: { [key: string]: string } = {
            'Content-Type': 'application/json'
        };

        const options: any = {
            method: method,
            headers: headers
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                console.error('Instagram API Error:', response.status, response.statusText, await response.text());
                throw new Error(`Instagram API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Instagram API request error:', error);
            throw error;
        }
    }

  async sendMessage(recipient: string, message: string): Promise<any> {
    if (!recipient || !message) {
      throw new Error('Recipient and message are required');
    }

    // IMPORTANT: Instagram's Direct Message API is limited.
    // This example is highly simplified and may not work as expected.
    const messageData = {
      recipient_id: recipient,
      text: message
    };

    return this.instagramApiRequest(`me/messages?access_token=${this.accessToken}`, 'POST', messageData); // Replace 'me/messages' with the correct endpoint
  }
}

export default InstagramService;