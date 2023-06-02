import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCountries } from "../../api-client";
import Card from "../../components/Card/Card";
import EmptyState from "../../components/EmptyState/EmptyState";
import styles from "./Home.module.scss";

export default function Home() {
  const [countries, setCountries] = useState<Record<string, any>[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCountries().then((data) => {
      setCountries(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <article data-testid="home_container" className={styles.container}>
      <div className={styles.content__filters}>Add Search and Filter here</div>
      {isLoading || countries?.length === 0 ? (
        <EmptyState
          message={
            isLoading ? "Loading" : "Country not found. Please try another one"
          }
        />
      ) : (
        <div className={styles.countries__wrapper}>
          {countries?.map((country) => (
            <Link
              to={`/${country.cca3.toLowerCase()}`}
              key={country.name.common}
            >
              <Card
                name={country.name.common}
                population={country.population}
                region={country.region}
                capital={country.capital}
                flags={country.flags}
              />
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
