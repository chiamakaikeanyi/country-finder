import type { ICountry } from "./types/Country";

/**
 * Combines a number of styles
 * @param {String} styles Classes/Styles to be applied
 * @returns {String} Combined classes
 */
export const composeClass = (...styles: string[]) => {
  let classes = "";

  styles.forEach((arg) => {
    if (arg) {
      classes += `${arg} `;
    }
  });

  return classes.trim();
};

export const sortByPopulationDescending = (a: ICountry, b: ICountry) => {
  if (a.population < b.population) return 1;
  if (b.population < a.population) return -1;

  return 0;
};

export const formatNumber = (number = 0) => new Intl.NumberFormat().format(number);

export const getRegionPopulation = (filteredCountries: ICountry[]) => {
  const totalPopulation = filteredCountries?.reduce(
    (acc, val) => acc + val.population,
    0
  );
  return formatNumber(totalPopulation);
};
