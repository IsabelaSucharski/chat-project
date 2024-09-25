import { request } from "../api/api";
import { RouteFiles } from "./routes";
import token from "./token";

const apiToken = token("FILES");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadFiles = async (params: FormData): Promise<any> => {
  const apiParams = {
    url: RouteFiles.uploadFiles,
    method: "POST",
    data: params,
    apiToken: apiToken,
  };

  const data = await request(apiParams);
  return data;
};
