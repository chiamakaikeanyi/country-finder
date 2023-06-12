import axios from "axios";
import config from "../config";

type ApiClientType = {
  path: string;
  options?: {
    method?: string;
    params?: { fields: string };
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
  return await apiClient({
    path: "/all",
    options: {
      params: {
        fields:
          "cca3,flags,name,population,region,subregion,capital,tld,currencies,languages,car,timezones,borders",
      },
    },
  });
};

export const getCountryByCode = async (code: string) => {
  return await apiClient({ path: `/alpha/${code}` });
};

export const getBorderCountriesByCode = async (codes: string[]) => {
  const details = [];

  for (const code of codes) {
    try {
      const response = await getCountryByCode(code);
      if (response) {
        details.push(...response);
      }
    } catch (error) {
      console.error(`Error retrieving details for ${code}:`, error);
    }
  }

  return details;
};
