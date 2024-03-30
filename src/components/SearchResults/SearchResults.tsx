/* eslint-disable indent */
import React from "react";

import { Link } from "react-router-dom";

import styles from "./SearchResults.module.scss";
import { ICountry } from "../../types/Country";
import Card from "../Card/Card";
import EmptyState from "../EmptyState/EmptyState";
import Map from "../Map/Map";

interface IProps {
  countries: ICountry[] | undefined;
  region: string;
  isError: boolean;
  isLoading: boolean;
}

const SearchResults: React.FC<IProps> = ({
  countries,
  region,
  isError,
  isLoading,
}) => {
  return (
    <section data-testid="results_container">
      {countries && countries.length > 0 && (
        <h2 className={styles.search_result__count}>
          Countries in{" "}
          {region ? (
            <span className={styles.search_result__region}>{region}</span>
          ) : (
            "the world"
          )}
          &nbsp;-&nbsp;
          {countries?.length > 200
            ? "More than 200 countries"
            : `${countries?.length} ${
                countries?.length > 1 ? "countries" : "country"
              }`}
        </h2>
      )}

      <div className={styles.results_container}>
        {isLoading || isError || countries?.length === 0 ? (
          <EmptyState
            message={
              isLoading
                ? "Loading..."
                : isError
                ? "An error occured. Please try again."
                : "Country not found. Please try another one."
            }
          />
        ) : (
          <article
            className={styles.countries__wrapper}
            data-testid="countries_list"
          >
            {countries?.map((country) => (
              <Link to={`/${country.cca3.toLowerCase()}`} key={country.cca3}>
                <Card
                  name={country.name.common}
                  population={country.population}
                  region={country.region}
                  capital={country.capital}
                  flags={country.flags}
                  cca3={country.cca3.toLowerCase()}
                />
              </Link>
            ))}
          </article>
        )}

        <section className={styles.map__wrapper}>
          <Map countries={countries} />
        </section>
      </div>
    </section>
  );
};

export default SearchResults;
