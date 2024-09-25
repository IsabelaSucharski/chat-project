import axios from "axios";
import { toast } from "react-toastify";

interface IConfig {
  url: string;
  method?: string;
  data?: object;
  params?: object;
  apiToken?: string;
}

const createAPIInstance = ({
  url,
  method,
  data,
  apiToken,
  params,
}: IConfig) => {
  return axios.create({
    method: method || "get",
    url,
    data: data || null,
    params: params || {},
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });
};

const API = axios.create();

API.interceptors.request.use(
  async (req) => {
    if (req.method === "post" && !(req.data instanceof FormData)) {
      req.data = { ...req.data };
    }
    return req;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        toast.error("Acesso expirado. Por favor, faça o login novamente.");
      } else {
        console.log(`Erro: ${error.response.data.message || error.message}`);
      }
    } else {
      toast.error("Erro de rede. Por favor, tente novamente.");
    }
    return Promise.reject(error);
  }
);

const request = async (config: IConfig) => {
  const instance = createAPIInstance(config);
  const response = await instance(config);
  return response.data;
};

export { API, request };
