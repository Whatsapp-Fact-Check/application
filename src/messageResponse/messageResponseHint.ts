import { MessageResponse } from './messageResponse';

export type hintType = "LongText" | "Question" | "NoHint"
export interface MessageResponseHint extends MessageResponse{
  hint: hintType
}
