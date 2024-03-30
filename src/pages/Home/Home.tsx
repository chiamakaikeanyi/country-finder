/* eslint-disable indent */
import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import styles from "./Home.module.scss";
import { Search } from "../../components/Icons";
import Input from "../../components/Input/Input";
import SearchResults from "../../components/SearchResults/SearchResults";
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

      <SearchResults
        countries={filteredCountries}
        region={region}
        isError={isError}
        isLoading={isLoading}
      />
    </section>
  );
}
