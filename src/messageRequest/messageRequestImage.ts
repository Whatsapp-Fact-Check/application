import { MessageRequest } from './messageRequest';

export interface MessageRequestImage extends MessageRequest {
  mediaUrl: string
  mediaType: string
}
