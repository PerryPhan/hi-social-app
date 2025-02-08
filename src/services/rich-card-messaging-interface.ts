// src/services/rich-card-messaging-interface.ts
interface RichCardMessagingInterface {
    sendRichCard(recipient: string, cardData: any): Promise<any>; // Define the type of cardData
  }
  
  export default RichCardMessagingInterface;