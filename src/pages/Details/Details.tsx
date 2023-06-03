import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getCountries, getCountryByCode } from "../../api-client";
import styles from "./Details.module.scss";
import Button from "../../components/Button/Button";
import EmptyState from "../../components/EmptyState/EmptyState";
import { ArrowLeftIcon } from "../../components/Icons";
import { ICountry } from "../../types/Country";

export default function Details() {
  const { countryCode } = useParams();
  const [country, setCountry] = useState<ICountry | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (countryCode) {
      setIsLoading(true);
      getCountryByCode(countryCode).then((data) => {
        if (data && data.status !== 400) {
          setCountry(data[0]);
        } else {
          setError(true);
        }
        setIsLoading(false);
      });
    }
  }, [countryCode]);

  /**
   * Temporal solution
   * TODO: Use Context
   */
  const [countries, setCountries] = useState<ICountry[] | null>(null);
  const [borders, setBorders] = useState<ICountry[] | null>(null);

  useEffect(() => {
    getCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  useEffect(() => {
    const getBorderCountries = (countryCodes: string[]) =>
      countries?.filter((country) => countryCodes.includes(country.cca3));

    if (country?.borders) {
      const borderCountries = getBorderCountries(country.borders);

      if (borderCountries) setBorders(borderCountries);
    }
  }, [countryCode]);

  return (
    <section data-testid="details_container" className={styles.container}>
      {country?.name?.common && (
        <Helmet>
          <title>{`${country?.name?.common} - Country Finder`}</title>
          <meta
            name="description"
            content={`${country?.name?.common} is a country located in ${country?.region} and is made up of ${country?.population} people`}
          />
        </Helmet>
      )}

      <Button icon={<ArrowLeftIcon />} label="Back" />

      <article className={styles.wrapper}>
        {isLoading || error ? (
          <EmptyState
            message={
              isLoading
                ? "Loading..."
                : "Country not found. Please try another one."
            }
          />
        ) : (
          <>
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

            <div>
              <h2 className={styles.heading}>{country?.name.common}</h2>
              <div className={styles.content}>
                <div>
                  {country?.name?.nativeName && country?.languages && (
                    <p className={styles.info}>
                      <span className={styles.info__title}>
                        Native Name(s):
                      </span>
                      <span className={styles.info__content}>
                        {
                          country.name.nativeName[
                            Object.keys(country.languages)[0]
                          ]?.common
                        }
                      </span>
                    </p>
                  )}
                  <p className={styles.info}>
                    <span className={styles.info__title}>Population:</span>
                    <span className={styles.info__content}>
                      {country?.population?.toLocaleString()}
                    </span>
                  </p>
                  <p className={styles.info}>
                    <span className={styles.info__title}>Region:</span>
                    <span className={styles.info__content}>
                      {country?.region}
                    </span>
                  </p>
                  {country?.subregion && (
                    <p className={styles.info}>
                      <span className={styles.info__title}>Sub Region:</span>
                      <span className={styles.info__content}>
                        {country.subregion}
                      </span>
                    </p>
                  )}
                  {country?.capital && (
                    <p className={styles.info}>
                      <span className={styles.info__title}>Capital:</span>
                      <span className={styles.info__content}>
                        {country.capital}
                      </span>
                    </p>
                  )}
                </div>

                <div>
                  <p className={styles.info}>
                    <span className={styles.info__title}>
                      Top Level Domain:
                    </span>
                    <span>{country?.tld.join(", ")}</span>
                  </p>
                  {country?.currencies && (
                    <p className={styles.info}>
                      <span className={styles.info__title}>Currencies:</span>
                      {Object.values(country.currencies).map(
                        (currency: any) => (
                          <span
                            className={styles.info__content}
                            key={currency.name}
                          >
                            {currency.name}
                          </span>
                        )
                      )}
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
                      <span className={styles.info__title}>
                        Driver&apos;s Side:
                      </span>
                      <span className={styles.info__content}>
                        {Object.values(country.car.side)}
                      </span>
                    </p>
                  )}
                  {country?.timezones && (
                    <p className={styles.info}>
                      <span className={styles.info__title}>Timezone(s):</span>
                      <span className={styles.info__content}>
                        {country.timezones.join(", ")}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.more_content}>
                <>
                  <span className={styles.info__title}>Border Countries:</span>
                  <ul className={styles.more_content__info}>
                    {borders ? (
                      borders.map((border) => (
                        <li
                          key={border.name.common}
                          className={styles.more_content__item}
                        >
                          <Link to={`/${border?.cca3.toLowerCase()}`}>
                            <Button
                              label={border.name.common}
                              customClass={styles.border_btn}
                            />
                          </Link>
                        </li>
                      ))
                    ) : (
                      <span className={styles.more_content__item}>None</span>
                    )}
                  </ul>
                </>
              </div>
            </div>
          </>
        )}
      </article>
    </section>
  );
}
