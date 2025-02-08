// src/services/facebook-service.ts
import fetch from 'node-fetch';
import MessagingServiceInterface from './messaging-service-interface';

class FacebookService implements MessagingServiceInterface {
  private pageId: string;
  private accessToken: string;
  private baseUrl: string = `https://graph.facebook.com/v17.0/`; // Update version as needed

  constructor(pageId: string, accessToken: string) {
    this.pageId = pageId;
    this.accessToken = accessToken;
  }

  private async facebookApiRequest(endpoint: string, method: string = 'GET', body: any = null): Promise<any> {
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
        console.error('Facebook API Error:', response.status, response.statusText, await response.text());
        throw new Error(`Facebook API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Facebook API request error:', error);
      throw error;
    }
  }

  async sendMessage(recipient: string, message: string): Promise<any> {
    if (!recipient || !message) {
      throw new Error('Recipient and message are required');
    }

    const messageData = {
      messaging_type: "RESPONSE",  // Or "UPDATE", "MESSAGE_TAG" as appropriate
      recipient: {
        id: recipient
      },
      message: {
        text: message
      }
    };

    return this.facebookApiRequest(`me/messages?access_token=${this.accessToken}`, 'POST', messageData);
  }

  // Add other Facebook API methods here (e.g., getUserProfile)
}

export default FacebookService;