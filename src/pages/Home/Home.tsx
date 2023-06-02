import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCountries } from "../../api-client";
import Card from "../../components/Card/Card";
import styles from "./Home.module.scss";
import Layout from "../../components/Layout/Layout";

export default function Home() {
  const [countries, setCountries] = useState<Record<string, any>[] | null>(
    null
  );

  useEffect(() => {
    getCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  if (countries?.length === 0) {
    return <h2>No country listed</h2>;
  }

  return (
    <Layout>
      <article data-testid="home_container" className={styles.container}>
        {countries?.map((country) => (
          <Link to={`/${country.cca3.toLowerCase()}`} key={country.name.common}>
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
    </Layout>
  );
}
