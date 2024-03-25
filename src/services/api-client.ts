import axios from "axios";

import config from "../config";

import type { ICountry } from "../types/Country";

type ApiClientType = {
  path: string;
  options?: {
    method?: string;
    body?: string;
    params?: { fields: string };
  };
};

type ApiResponse<T> = Promise<T>;

export const apiClient = async <T>({
  path,
  options = {
    method: "GET",
    params: {
      fields:
        "cca3,flags,name,population,region,subregion,capital,tld,currencies,languages,car,timezones,borders,latlng",
    },
  },
}: ApiClientType): ApiResponse<T> => {
  return axios({
    url: `${config.apiUrl}${path}`,
    method: options?.method,
    data: options?.body,
    params: options?.params,
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.data as T)
    .catch((error) => {
      console.error(`Error retrieving data: ${error}`);
      throw error;
    });
};

export const getCountries = (): ApiResponse<ICountry[]> => {
  return apiClient<ICountry[]>({
    path: "/all",
  });
};

export const getCountryByCode = (code: string): ApiResponse<ICountry> => {
  return apiClient<ICountry>({ path: `/alpha/${code}` });
};

export const getBorderCountriesByCodes = async (
  codes: string[]
): ApiResponse<ICountry[]> => {
  const response = await getCountries();

  return response.filter((country: ICountry) => codes.includes(country.cca3));
};
