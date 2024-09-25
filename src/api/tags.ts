import { IParams, ITagsResponse } from "../@types";
import { request } from "../api/api";
import { RouteTags } from "./routes";
import token from "./token";

const apiToken = token("SYNC");

export const getAllTags = async (params: IParams): Promise<ITagsResponse[]> => {
  const apiParams = {
    url: RouteTags.getAllTags,
    method: "GET",
    params,
    apiToken: apiToken,
  };
  const data = await request(apiParams);
  return data;
};

export const getTagsCount = async (params: IParams): Promise<ITagsResponse> => {
  const apiParams = {
    url: RouteTags.getTagsCount,
    method: "GET",
    params,
    apiToken: apiToken,
  };
  const data = await request(apiParams);
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteTag = async (tagId: string): Promise<any> => {
  const apiParams = {
    url: RouteTags.deleteTag(tagId),
    method: "DELETE",
    apiToken: apiToken,
  };
  const data = await request(apiParams);
  return data;
};

export const createTag = async (params: IParams): Promise<ITagsResponse> => {
  const apiParams = {
    url: RouteTags.createTag,
    method: "POST",
    data: params,
    apiToken: apiToken,
  };
  const data = await request(apiParams);
  return data;
};
