import { IDocumentsResponse, IParams } from "../@types";
import { request } from "../api/api";
import { RouteDocuments } from "./routes";
import token from "./token";

const apiToken = token("SYNC");

export const getAllDocuments = async (
  params: IParams
): Promise<IDocumentsResponse[]> => {
  const apiParams = {
    url: RouteDocuments.getAllDocuments,
    method: "POST",
    data: params,
    apiToken: apiToken,
  };

  const data = await request(apiParams);
  return data;
};

export const getDocumentsCount = async (
  params: IParams
): Promise<IDocumentsResponse> => {
  const apiParams = {
    url: RouteDocuments.getDocumentsCount,
    method: "POST",
    data: params,
    apiToken: apiToken,
  };

  const data = await request(apiParams);
  return data;
};

export const getDocumentById = async (
  params: IParams
): Promise<IDocumentsResponse[]> => {
  const apiParams = {
    url: RouteDocuments.getDocumentsById,
    method: "POST",
    data: params,
    apiToken: apiToken,
  };

  const data = await request(apiParams);
  return data;
};

export const deleteDocument = async (
  id: string
): Promise<IDocumentsResponse> => {
  const apiParams = {
    url: RouteDocuments.deleteDocument(id),
    method: "DELETE",
    apiToken: apiToken,
  };

  const data = await request(apiParams);
  return data;
};
