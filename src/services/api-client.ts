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

export const apiClient = async ({
  path,
  options = {
    method: "GET",
    params: {
      fields:
        "cca3,flags,name,population,region,subregion,capital,tld,currencies,languages,car,timezones,borders",
    },
  },
}: ApiClientType) => {
  return await axios({
    url: `${config.apiUrl}${path}`,
    method: options?.method,
    data: options?.body,
    params: options?.params,
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.data)
    .catch((error) => console.error(`Error retrieving data: ${error}`));
};

export const getCountries = () => {
  return apiClient({
    path: "/all",
  });
};

export const getCountryByCode = (code: string) => {
  return apiClient({ path: `/alpha/${code}` });
};

export const getBorderCountriesByCodes = async (codes: string[]) => {
  const response = await getCountries();

  return response?.filter((country: ICountry) => codes.includes(country.cca3));
};
