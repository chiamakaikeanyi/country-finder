import axios from "axios";
import config from "../config";

import type { ICountry } from "../types/Country";

type ApiClientType = {
  path: string;
  options?: {
    method?: string;
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
    params: options?.params,
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.data)
    .catch((error) => console.error(`Error: ${error}`));
};

export const getCountries = async () => {
  return await apiClient({
    path: "/all",
  });
};

export const getCountryByCode = async (code: string) => {
  return await apiClient({ path: `/alpha/${code}` });
};

export const getBorderCountriesByCodes = async (codes: string[]) => {
  try {
    const response = await getCountries();

    return response?.filter((country: ICountry) =>
      codes.includes(country.cca3)
    );
  } catch (error) {
    console.error("Error retrieving border countries:", error);
    return [];
  }
};
