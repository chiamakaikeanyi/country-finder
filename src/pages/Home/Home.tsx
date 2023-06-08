import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCountries } from "../../services/api-client";
import { sortByPopulationDescending } from "../../utils";

import Card from "../../components/Card/Card";
import EmptyState from "../../components/EmptyState/EmptyState";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import { Search } from "../../components/Icons";
import styles from "./Home.module.scss";

import type { ICountry } from "../../types/Country";

export default function Home() {
  const [countries, setCountries] = useState<ICountry[] | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<ICountry[] | null>(
    null
  );
  const [regions, setRegions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getCountries().then((data) => {
      setCountries(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const uniqueRegions = [
      ...new Set(countries?.map((country) => country.region)),
    ].filter((region) => region !== "");

    setRegions(uniqueRegions?.sort());
  }, [countries]);

  useEffect(() => {
    if (countries) {
      setFilteredCountries(
        countries
          .filter((country) =>
            country.name.common.toLowerCase().includes(searchTerm)
          )
          .filter((country) =>
            region === "" ? country : country.region.toLowerCase() === region
          )
      );
    }
  }, [countries, region, searchTerm]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.replace(/[^a-z]/gi, "").toLowerCase();
    setSearchTerm(searchTerm);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(event.target.value.toLowerCase());
  };

  return (
    <section data-testid="home_container" className={styles.container}>
      <div className={styles.content__filters}>
        <Input
          type="search"
          name="country_search"
          icon={<Search size={15} />}
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <Select
          placeholder="Filter by Region"
          name="regions"
          options={regions}
          onChange={handleFilter}
        />
      </div>

      {filteredCountries && filteredCountries.length > 0 && (
        <h2 className={styles.search_result__count}>
          {`Countries in ${
            region ? (
              <span className={styles.search_result__region}>{region}</span>
            ) : (
              "the world"
            )
          } - 
           ${
        filteredCountries?.length > 200
          ? "More than 200 countries"
          : `${filteredCountries?.length} ${
            filteredCountries?.length > 1 ? "countries" : "country"
          }`
        }
          `}
        </h2>
      )}

      {isLoading || filteredCountries?.length === 0 ? (
        <EmptyState
          message={
            isLoading
              ? "Loading..."
              : "Country not found. Please try another one."
          }
        />
      ) : (
        <article className={styles.countries__wrapper}>
          {filteredCountries
            ?.sort(sortByPopulationDescending)
            ?.map((country) => (
              <Link to={`/${country.cca3.toLowerCase()}`} key={country.cca3}>
                <Card
                  name={country.name.common}
                  population={country.population}
                  region={country.region}
                  capital={country.capital}
                  flags={country.flags}
                />
              </Link>
            ))}
        </article>
      )}
    </section>
  );
}
