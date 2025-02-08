// src/services/messaging-service-interface.ts
interface MessagingServiceInterface {
    sendMessage(recipient: string, message: string): Promise<any>;
    // Define other common methods here
  }
  
  export default MessagingServiceInterface;