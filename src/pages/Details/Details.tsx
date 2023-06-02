import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCountryByCode } from "../../api-client";
import styles from "./Details.module.scss";

export default function Details() {
  const { countryCode } = useParams();
  const [country, setCountry] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    if (countryCode) {
      getCountryByCode(countryCode).then((data) => {
        if (data) setCountry(data[0]);
      });
    }
  }, [countryCode]);

  return (
    <section data-testid="details_container" className={styles.container}>
      <article>
        <img
          src={country?.flags.svg}
          loading="lazy"
          alt={
            country?.flags?.alt
              ? country?.flags?.alt
              : `${country?.name.common} flag`
          }
          width="150px"
          className={styles.image}
        />

        <div className={styles.body}>
          <h2 className={styles.title}>{country?.name.common}</h2>
          {country?.name?.nativeName && (
            <p className={styles.info}>
              <span className={styles.info__title}>Native Name(s):</span>
              {Object.values(country.name.nativeName).map((nativeName: any) => (
                <span className={styles.info__content} key={nativeName.common}>
                  {nativeName.common}
                </span>
              ))}
            </p>
          )}
          <p className={styles.info}>
            <span className={styles.info__title}>Population:</span>
            <span className={styles.info__content}>{country?.population}</span>
          </p>
          <p className={styles.info}>
            <span className={styles.info__title}>Region:</span>
            <span className={styles.info__content}>{country?.region}</span>
          </p>
          {country?.subregion && (
            <p className={styles.info}>
              <span className={styles.info__title}>Sub Region:</span>
              <span className={styles.info__content}>{country.subregion}</span>
            </p>
          )}
          {country?.capital && (
            <p className={styles.info}>
              <span className={styles.info__title}>Capital:</span>
              <span className={styles.info__content}>{country.capital}</span>
            </p>
          )}
        </div>

        <div className={styles.body}>
          <p className={styles.info}>
            <span className={styles.info__title}>Top Level Domain:</span>
            <span className={styles.info__content}>
              {country?.tld.join(", ")}
            </span>
          </p>
          {country?.currencies && (
            <p className={styles.info}>
              <span className={styles.info__title}>Currencies:</span>
              {Object.values(country.currencies).map((currency: any) => (
                <span className={styles.info__title} key={currency.name}>
                  {currency.name}
                </span>
              ))}
            </p>
          )}
          {country?.languages && (
            <p className={styles.info}>
              <span className={styles.info__title}>Languages:</span>
              <span className={styles.info__content}>
                {Object.values(country.languages).join(", ")}
              </span>
            </p>
          )}
          {country?.car && (
            <p className={styles.info}>
              <span className={styles.info__title}>Driver&apos;s Side:</span>
              {Object.values(country.car.side)}
            </p>
          )}
          {country?.timezones && (
            <p className={styles.info}>
              <span className={styles.info__title}>Timezones:</span>
              {country.timezones}
            </p>
          )}
        </div>

        {country?.borders && (
          <div className={styles.body}>
            <span className={styles.info__title}>Border Countries:</span>
            {country.borders.map((country: string) => (
              <Link to={`/${country.toLowerCase()}`} key={country}>
                {country}
              </Link>
            ))}
          </div>
        )}
      </article>
    </section>
  );
}
