import axios from "axios";
import config from "./config";

type ApiClientType = {
  path: string;
  options?: {
    method?: string;
    params?: { fullText: boolean };
  };
};

export const apiClient = async ({
  path,
  options = { method: "GET" },
}: ApiClientType) => {
  return await axios({
    url: `${config.apiUrl}${path}`,
    method: options?.method,
    params: options?.params,
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.data)
    .catch((error) => console.error(`Error: ${error}`));
};

export const getCountries = async () => {
  return await apiClient({ path: "/all" });
};

export const getCountryByCode = async (code: string) => {
  return await apiClient({
    path: `/alpha/${code}`,
  });
};

export const getCountryByName = async (name: string) => {
  return await apiClient({
    path: `/name/${name.toLowerCase()}`,
    options: {
      params: { fullText: true },
    },
  });
};

export const getCountriesByRegion = async (region: string) => {
  return await apiClient({ path: `/region/${region.toLowerCase()}` });
};
