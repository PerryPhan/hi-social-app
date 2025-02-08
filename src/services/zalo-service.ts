// src/services/zalo-service.ts
import fetch from 'node-fetch';
import MessagingServiceInterface from './messaging-service-interface';
import RichCardMessagingInterface from './rich-card-messaging-interface';

class ZaloService implements MessagingServiceInterface, RichCardMessagingInterface {
  private appId: string;
  private appSecret: string;
  private accessToken: string;
  private baseUrl: string = 'https://openapi.zalo.me/v2.0/';

  constructor(appId: string, appSecret: string, accessToken: string) {
    this.appId = appId;
    this.appSecret = appSecret;
    this.accessToken = accessToken;
  }

  private async zaloApiRequest(endpoint: string, method: string = 'GET', body: any = null): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;

    const headers: { [key: string]: string } = {
      'access_token': this.accessToken,
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
        console.error('Zalo API Error:', response.status, response.statusText, await response.text());
        throw new Error(`Zalo API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Zalo API request error:', error);
      throw error;
    }
  }

  async sendMessage(recipient: string, message: string): Promise<any> {
    if (!recipient || !message) {
      throw new Error('Recipient and message are required');
    }

    const messageData = {
      recipient: {
        user_id: recipient
      },
      message: {
        text: message
      }
    };

    return this.zaloApiRequest('message', 'POST', messageData); // Replace 'message' with the correct endpoint
  }

  async sendRichCard(recipient: string, cardData: any): Promise<any> {
    // Zalo-specific implementation for sending a rich card
    console.log(`Sending rich card to ${recipient} with data:`, cardData); // Replace with actual API call.
    return Promise.resolve({ success: true }); // Dummy implementation.
  }
}

export default ZaloService;