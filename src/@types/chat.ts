export interface IMessage {
  question?: string;
  message?: string;
  session?: string;
  session_id?: string;
}

export interface IChatResponse {
  data: IMessage;
  success: boolean;
}
