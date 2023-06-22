import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import styles from "./Home.module.scss";
import Card from "../../components/Card/Card";
import EmptyState from "../../components/EmptyState/EmptyState";
import { Search } from "../../components/Icons";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import { getCountries } from "../../services/api-client";
import { sortByPopulationDescending } from "../../utils";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");

  const {
    data: countries,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    select: (data) => data?.sort(sortByPopulationDescending),
  });

  const { data: uniqueRegions } = useQuery({
    queryKey: ["uniqueRegions"],
    queryFn: () => {
      if (countries) {
        const regions = [
          ...new Set(countries.map((country) => country.region)),
        ].filter((region) => region !== "");
        return regions.sort();
      }
      return [];
    },
    refetchInterval: 1000 * 60 * 60, // 60 minutes
    enabled: Boolean(countries),
  });

  const { data: filteredCountries } = useQuery({
    queryKey: ["filteredCountries", countries, region, searchTerm],
    queryFn: () => {
      if (countries) {
        return countries
          .filter((country) =>
            country.name.common.toLowerCase().includes(searchTerm)
          )
          .filter((country) =>
            region === "" ? country : country.region.toLowerCase() === region
          );
      }
      return [];
    },
    enabled: Boolean(countries),
  });

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
          label="Search"
          icon={<Search size={15} />}
          placeholder="Search for a country..."
          value={searchTerm}
          testId="country_search"
          onChange={handleSearch}
        />
        <Select
          placeholder="Filter by Region"
          name="regions"
          testId="regions"
          options={uniqueRegions || []}
          onChange={handleFilter}
        />
      </div>

      {filteredCountries && filteredCountries.length > 0 && (
        <h2 className={styles.search_result__count}>
          Countries in{" "}
          {region ? (
            <span className={styles.search_result__region}>{region}</span>
          ) : (
            "the world"
          )}
          &nbsp;-&nbsp;
          {filteredCountries?.length > 200
            ? "More than 200 countries"
            : `${filteredCountries?.length} ${
              filteredCountries?.length > 1 ? "countries" : "country"
            }`}
        </h2>
      )}

      {isLoading || isError || filteredCountries?.length === 0 ? (
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
          {filteredCountries?.map((country) => (
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
    </section>
  );
}
