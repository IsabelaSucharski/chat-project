import { IChatResponse, IMessage } from "../@types";
import { request } from "../api/api";
import { RouteChat } from "./routes";
import token from "./token";

const apiToken = token("CHAT");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const askBot = async (params: IMessage): Promise<IChatResponse> => {
  const apiParams = {
    url: RouteChat.askBot,
    method: "POST",
    data: params,
    apiToken: apiToken,
  };
  const data = await request(apiParams);
  return data;
};
