import { IParams, IPromptsResponse } from "../@types";
import { request } from "../api/api";
import { RoutePrompt } from "./routes";
import token from "./token";

const apiToken = token("SYNC");

export const getBotPrompt = async (
  botName: string
): Promise<IPromptsResponse> => {
  const apiParams = {
    url: RoutePrompt.getBotPrompt(botName),
    method: "GET",
    apiToken: apiToken,
  };

  const data = await request(apiParams);
  return data;
};

export const updateBotPrompt = async (
  botId: string,
  params: IParams
): Promise<IPromptsResponse> => {
  const apiParams = {
    url: RoutePrompt.updateBotPrompt(botId),
    method: "PATCH",
    data: params,
    apiToken: apiToken,
  };

  const data = await request(apiParams);
  return data;
};
